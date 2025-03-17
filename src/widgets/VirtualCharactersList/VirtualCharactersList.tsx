import { Center, Flex } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { useRef } from "react";
import { CharacterCard } from "../../entities";
import { Button, ErrorBlock } from "../../shared/ui";
import s from "./VirtualCharactersList.module.scss";
import { IVirtualCharactersList } from "./types";

export const VirtualCharactersList = ({
  data,
  refetch,
  isFetching,
  isError,
  selectedCharacter,
  setSelectedCharacter,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: IVirtualCharactersList) => {
  const itemsCount = data.length;

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? itemsCount : itemsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  if (isError) {
    return (
      <ErrorBlock>
        <Button size="lg" onClick={() => refetch()}>
          Try again
        </Button>
      </ErrorBlock>
    );
  }

  if (!data && !isFetching) {
    return <Center>No data</Center>;
  }

  return (
    <Flex ref={parentRef} className={s.contentContainer}>
      <Flex className={s.content} h={`${virtualizer.getTotalSize() + 50}px`}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const { id, image, name } = data[virtualItem.index];

          return (
            <CharacterCard
              key={virtualItem.index}
              id={id}
              image={image}
              name={name}
              size={virtualItem.size}
              start={virtualItem.start}
              selectedCharacter={selectedCharacter}
              setSelectedCharacter={setSelectedCharacter}
            />
          );
        })}
        {hasNextPage ? (
          <Button
            loading={isFetchingNextPage}
            className={clsx(s.lastBlock, s.loadButton)}
            size="lg"
            onClick={fetchNextPage}
          >
            Load more
          </Button>
        ) : (
          <Center className={s.lastBlock} fz={"h4"} fw={"bold"}>
            No more data
          </Center>
        )}
      </Flex>
    </Flex>
  );
};
