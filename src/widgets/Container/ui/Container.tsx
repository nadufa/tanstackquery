import { Box, Flex, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { ICharacter } from "../../../entities/character";
import { useGetCharacters } from "../../../entities/character/api";
import { SearchBar } from "../../../features";
import { initialState } from "../../../pages/HomePage/lib";
import { Button } from "../../../shared/ui";
import { CharactersList } from "../../CharactersList/ui/CharactersList";
import { CharacterInfo } from "../../ChatacterInfo";
import s from "./Container.module.scss";

export const Container = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  );
  const [searchState, setSearchState] = useState(initialState);

  const [debounced] = useDebouncedValue(searchState.inputText, 1000);
  const {
    data,
    isFetching,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCharacters({
    ...searchState,
    inputText: debounced,
  });

  const finalData: ICharacter[] = useMemo(() => {
    return data
      ? data.pages.reduce((result, current) => {
          return [...result, ...current.results];
        }, [] as ICharacter[])
      : [];
  }, [data]);

  useEffect(
    () => setSelectedCharacter(null),
    [
      searchState.genderValue,
      searchState.inputSelect.value,
      debounced,
      searchState.statusValue,
    ]
  );

  return (
    <Flex className={s.container}>
      <SearchBar searchState={searchState} setSearchState={setSearchState} />

      <Flex className={s.contentBlock}>
        <Flex className={clsx(s.list, s.contentPart)}>
          <Box className={s.contentHeader}>
            <Title order={2}>List of characters</Title>
          </Box>

          <CharactersList
            data={finalData}
            isError={isError}
            isLoading={isFetching && !isFetchingNextPage}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            errorBlockChildren={
              <Button onClick={() => refetch()}>Try again</Button>
            }
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </Flex>

        <Flex className={clsx(s.details, s.contentPart)}>
          <Box className={s.contentHeader}>
            <Title order={2}>Character information</Title>
          </Box>
          <CharacterInfo selectedCharacterId={selectedCharacter} />
        </Flex>
      </Flex>
    </Flex>
  );
};
