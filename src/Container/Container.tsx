import { Box, Flex, Pagination, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";
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
  activePage: null,
};

export const Container = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  );
  const [searchState, setSearchState] = useState(initialState);

  const [debounced] = useDebouncedValue(searchState.inputText, 1000);

  const { data, isFetching, isError, refetch } = useGetCharacters({
    ...searchState,
    inputText: debounced,
  });

  useEffect(
    () => setSelectedCharacter(null),
    [
      searchState.genderValue,
      searchState.inputSelect.value,
      debounced,
      searchState.statusValue,
    ]
  );

  const setPageHandler = (value: number) => {
    setSearchState({
      ...searchState,
      activePage: value,
    });
  };

  return (
    <Flex className={s.main}>
      <Flex className={s.container}>
        <Search searchState={searchState} setSearchState={setSearchState} />
        <Flex className={s.contentBlock}>
          <Flex className={clsx(s.list, s.contentPart)}>
            <Box className={s.contentHeader}>
              <Title order={2}>List of characters</Title>
            </Box>
            <List
              data={data}
              refetch={refetch}
              isError={isError}
              isFetching={isFetching}
              selectedCharacter={selectedCharacter}
              setSelectedCharacter={setSelectedCharacter}
            />
            <Flex className={s.contentFooter}>
              <Pagination
                value={searchState.activePage ?? 1}
                color={"#7c609a"}
                total={data?.info.pages ?? 10}
                size="xl"
                onChange={setPageHandler}
              />
            </Flex>
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
