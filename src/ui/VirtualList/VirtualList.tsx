import { Box, Button, Center, Flex, Image, Title } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { Dispatch, SetStateAction, useRef } from "react";
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
  const selectCharacterHandler = (id: number) => {
    setSelectedCharacter(selectedCharacter === id ? null : id);
  };

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
            <Flex
              key={virtualItem.index}
              className={s.itemContainer}
              h={`${virtualItem.size}px`}
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <Flex
                className={clsx(
                  s.characterItem,
                  selectedCharacter === id && s.selected
                )}
                key={id}
                onClick={() => selectCharacterHandler(id)}
              >
                <Image className={s.characterItemImg} src={image} />
                <Box>
                  <Title order={3}>Name: {name}</Title>
                  <Title order={3}>ID: {id}</Title>
                </Box>
              </Flex>
            </Flex>
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
