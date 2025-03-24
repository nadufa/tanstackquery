import { CharacterDetails } from "@/entities";
import { useGetSelectedCharacter } from "@/entities/character";
import { EditCharacter } from "@/features";
import { Button } from "@/shared/ui";
import { ICharacterInfo } from "./types";

export const CharacterInfo = ({ selectedCharacterId }: ICharacterInfo) => {
  const { data, isError, isFetching, refetch } = useGetSelectedCharacter({
    selectedCharacterId,
  });

  return (
    <>
      <CharacterDetails
        isError={isError}
        isLoading={isFetching}
        data={data}
        emptyDataLabel="Select character"
        isEmptyData={!data}
        errorBlockChildren={
          <Button onClick={() => refetch()}>Try again</Button>
        }
      />
      {data && <EditCharacter data={data} />}
    </>
  );
};
