import { Box, Flex, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { CharacterDetails } from "../../../entities";
import { ICaracter } from "../../../entities/character";
import { useGetCharacters } from "../../../entities/character/api";
import { SearchBar } from "../../../features";
import { initialState } from "../../../pages/HomePage/lib";
import { VirtualCharactersList } from "../../VirtualCharactersList";
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

  const finalData: ICaracter[] = useMemo(() => {
    return data
      ? data.pages.reduce((result, current) => {
          return [...result, ...current.results];
        }, [] as ICaracter[])
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

          <VirtualCharactersList
            data={finalData}
            refetch={refetch}
            isError={isError}
            isFetching={isFetching}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </Flex>

        <Flex className={clsx(s.details, s.contentPart)}>
          <Box className={s.contentHeader}>
            <Title order={2}>Character information</Title>
          </Box>
          <CharacterDetails selectedCharacter={selectedCharacter} />
        </Flex>
      </Flex>
    </Flex>
  );
};
