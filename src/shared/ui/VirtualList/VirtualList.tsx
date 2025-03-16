import { Button, Center, Flex } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { Dispatch, SetStateAction, useRef } from "react";
import { CharacterCard } from "../../../entities";
import { ICaracter } from "../../api/types";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import s from "./VirtualList.module.scss";

export const VirtualList = ({
  data,
  refetch,
  isFetching,
  isError,
  selectedCharacter,
  setSelectedCharacter,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  data: ICaracter[];
  refetch: () => void;
  selectedCharacter: number | null;
  isFetching: boolean;
  isError: boolean;
  setSelectedCharacter: Dispatch<SetStateAction<null | number>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) => {
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
        <Button bg={"#7c609a"} size="lg" onClick={() => refetch()}>
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
              id={id}
              image={image}
              name={name}
              index={virtualItem.index}
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
