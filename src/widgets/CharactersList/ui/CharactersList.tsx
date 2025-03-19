import { CharacterCard } from "@/entities";
import { withQueryStatus, withVirtualizer } from "@/shared/hocs";
import { IWithQueryStatus } from "@/shared/hocs/withQueryStatus/types";
import { LoadMoreBlock, LoadMoreType } from "./LoadMoreBlock";
import { IVirtualCharactersList } from "./types";

const WithVirtualizerList = withVirtualizer({
  estimateSize: 200,
  overscan: 3,
})();

export const CharactersList = withQueryStatus(
  ({
    data,
    selectedCharacter,
    setSelectedCharacter,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }: IVirtualCharactersList & IWithQueryStatus & LoadMoreType) => {
    return (
      <WithVirtualizerList
        itemsCount={data.length}
        loadMoreBlock={
          <LoadMoreBlock
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        }
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
  }
);
