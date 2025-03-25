import {
  CharacterDetails,
  useCharacterSettingsStore,
  useGetSelectedCharacter,
} from "@/entities/character";
import { EditCharacter } from "@/features";
import { Button } from "@/shared/ui";

export const CharacterInfo = () => {
  const selectedId = useCharacterSettingsStore((state) => state.selectedId);

  const { data, isError, isFetching, refetch } = useGetSelectedCharacter({
    selectedCharacterId: selectedId,
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
