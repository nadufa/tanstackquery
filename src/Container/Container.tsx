import { Box, Flex, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ICaracter } from "../api/types";
import { useGetCharacters } from "../api/useGetCharacters";
import { Details } from "../ui/Details/Details";
import { List } from "../ui/List/List";
import { Search } from "../ui/Search/Search";
import s from "./Container.module.scss";
import { ISearchState } from "./types";

// const debounce = (callback: () => void) => {
//   let timerId: number;

//   return () => {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => {
//       callback();
//     }, 3000);
//   };
// };

const initialState: ISearchState = {
  inputText: "",
  inputSelect: {
    value: "name",
    label: "Name",
    disabled: false,
  },
  statusValue: "all",
  genderValue: "all",
};

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

  const finalData: ICaracter[] = [];

  if (data) {
    data.pages.forEach(({ results }) => {
      finalData.push(...results);
    });
  }
  console.log(finalData);

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
    <Flex className={s.main}>
      <Flex className={s.container}>
        <Search searchState={searchState} setSearchState={setSearchState} />
        <Flex className={s.contentBlock}>
          <Flex className={clsx(s.list, s.contentPart)}>
            <Box className={s.contentHeader}>
              <Title order={2}>List of characters</Title>
            </Box>
            {finalData.length && (
              <List
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
            )}
          </Flex>
          <Flex className={clsx(s.details, s.contentPart)}>
            <Box className={s.contentHeader}>
              <Title order={2}>Character information</Title>
            </Box>
            <Details selectedCharacter={selectedCharacter} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
