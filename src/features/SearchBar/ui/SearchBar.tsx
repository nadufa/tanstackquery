import { Flex, Input, SegmentedControl, Select } from "@mantine/core";

import { useCharacterSettingsStore } from "@/entities/character/model";
import { genderValueData, inputSelectData, statusValueData } from "../lib";
import s from "./SearchBar.module.scss";

export const SearchBar = () => {
  const searchState = useCharacterSettingsStore((state) => state.searchState);

  const setSearchInput = useCharacterSettingsStore(
    (state) => state.setSearchInput
  );
  const setSearchSelect = useCharacterSettingsStore(
    (state) => state.setSearchSelect
  );
  const setSearchStatus = useCharacterSettingsStore(
    (state) => state.setSearchStatus
  );
  const setSearchGender = useCharacterSettingsStore(
    (state) => state.setSearchGender
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
