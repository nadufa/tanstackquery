import { CharacterCard } from "../../entities";
import { withVirtualizer } from "../../shared/hocs/withVirtualizer/ui/withVirtualizer";
import { IVirtualCharactersList } from "./types";

const WithVirtualizerList = withVirtualizer({
  estimateSize: 200,
  overscan: 3,
});

export const VirtualCharactersList = ({
  data,
  // refetch,
  // isFetching,
  // isError,
  selectedCharacter,
  setSelectedCharacter,
  // hasNextPage,
  // isFetchingNextPage,
  // fetchNextPage,
}: IVirtualCharactersList) => {
  return (
    <WithVirtualizerList
      itemsCount={data.length}
      renderItem={({ index, size, start }) => {
        const { id, image, name } = data[index];

        return (
          <CharacterCard
            key={index}
            id={id}
            image={image}
            name={name}
            size={size}
            start={start}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
          />
        );
      }}
    />
  );

  // return (
  //   <WithVirtualizer
  //     ParentComponent={Flex}
  //     estimateSize={200}
  //     itemsCount={data.length}
  //     overscan={5}
  //     lastBlockHeight={50}
  //     renderItem={({ index, size, start }) => {
  //       const { id, image, name } = data[index];

  //       return (
  //         <CharacterCard
  //           key={index}
  //           id={id}
  //           image={image}
  //           name={name}
  //           size={size}
  //           start={start}
  //           selectedCharacter={selectedCharacter}
  //           setSelectedCharacter={setSelectedCharacter}
  //         />
  //       );
  //     }}
  //   />
  // );

  // (
  //   <Flex ref={parentRef} className={s.contentContainer}>
  //     <Flex className={s.content} h={`${virtualizer.getTotalSize() + 50}px`}>
  //       {virtualizer.getVirtualItems().map((virtualItem) => {
  //         const { id, image, name } = data[virtualItem.index];

  //         return (
  //           <CharacterCard
  //             key={virtualItem.index}
  //             id={id}
  //             image={image}
  //             name={name}
  //             size={virtualItem.size}
  //             start={virtualItem.start}
  //             selectedCharacter={selectedCharacter}
  //             setSelectedCharacter={setSelectedCharacter}
  //           />
  //         );
  //       })}
  //       {hasNextPage ? (
  //         <Button
  //           loading={isFetchingNextPage}
  //           className={clsx(s.lastBlock, s.loadButton)}
  //           size="lg"
  //           onClick={fetchNextPage}
  //         >
  //           Load more
  //         </Button>
  //       ) : (
  //         <Center className={s.lastBlock} fz={"h4"} fw={"bold"}>
  //           No more data
  //         </Center>
  //       )}
  //     </Flex>
  //   </Flex>
  // );
};
