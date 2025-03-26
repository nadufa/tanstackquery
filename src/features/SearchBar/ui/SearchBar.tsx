import { Flex, Input, SegmentedControl, Select } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";

import { useCharacterSettingsStore } from "@/entities/character/model";
import { genderValueData, inputSelectData, statusValueData } from "../lib";
import s from "./SearchBar.module.scss";

export const SearchBar = () => {
  const {
    searchState,
    setSearchGender,
    setSearchInput,
    setSearchSelect,
    setSearchStatus,
  } = useCharacterSettingsStore(
    useShallow(
      ({
        searchState,
        setSearchInput,
        setSearchSelect,
        setSearchStatus,
        setSearchGender,
      }) => ({
        searchState,
        setSearchInput,
        setSearchSelect,
        setSearchStatus,
        setSearchGender,
      })
    )
  );

  return (
    <Flex className={s.searchPanel}>
      <Flex className={s.searchBlock}>
        <Input
          value={searchState.inputText}
          onChange={setSearchInput}
          className={s.search}
          placeholder="Search"
        />
        <Select
          flex={1}
          allowDeselect={false}
          data={inputSelectData}
          value={searchState.inputSelect.value}
          onChange={(_value, option) => {
            setSearchSelect(option);
          }}
          size="lg"
        />
      </Flex>
      <Flex className={s.searchBlock}>
        <SegmentedControl
          withItemsBorders={false}
          w={"40%"}
          data={statusValueData}
          value={searchState.statusValue}
          onChange={setSearchStatus}
          size="lg"
        />
        <SegmentedControl
          withItemsBorders={false}
          w={"60%"}
          data={genderValueData}
          value={searchState.genderValue}
          onChange={setSearchGender}
          size="lg"
        />
      </Flex>
    </Flex>
  );
};
