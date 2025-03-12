import { Box, ComboboxItem, Flex, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import { useState } from "react";
import { useGetCharacters } from "../api/useGetCharacters";
import { Details } from "../ui/Details/Details";
import { List } from "../ui/List/List";
import { Search } from "../ui/Search/Search";
import s from "./Container.module.scss";

// const debounce = (callback: () => void) => {
//   let timerId: number;

//   return () => {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => {
//       callback();
//     }, 3000);
//   };
// };

export interface ISearchState {
  inputText: string;
  inputSelect: ComboboxItem;
  statusValue: string;
  genderValue: string;
}

export const Container = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  );
  const [searchState, setSearchState] = useState<ISearchState>({
    inputText: "",
    inputSelect: {
      value: "name",
      label: "Name",
      disabled: false,
    },
    statusValue: "all",
    genderValue: "all",
  });

  const [debounced] = useDebouncedValue(searchState.inputText, 1000);

  const { data, isFetching, isError, refetch } = useGetCharacters({
    ...searchState,
    inputText: debounced,
  });

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
