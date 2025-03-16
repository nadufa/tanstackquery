import { Flex, Input, SegmentedControl, Select } from "@mantine/core";
import { ChangeEvent } from "react";
import s from "./SearchBar.module.scss";
import { genderValueData, inputSelectData, statusValueData } from "./constants";
import { isGenderValueType, isStatusValueType } from "./predicates";
import { ISearchBar } from "./types";

export const SearchBar = ({ searchState, setSearchState }: ISearchBar) => {
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchState({
      ...searchState,
      inputText: e.currentTarget.value,
    });
  };

  const onChangeSelectHandler = (option: {
    label: string;
    value: string;
    disabled?: boolean;
  }) => {
    setSearchState({ ...searchState, inputSelect: option });
  };

  const onChangeStatusHandler = (value: string) => {
    if (isStatusValueType(value)) {
      setSearchState({ ...searchState, statusValue: value });
    }
  };

  const onChangeGenderHandler = (value: string) => {
    if (isGenderValueType(value)) {
      setSearchState({ ...searchState, genderValue: value });
    }
  };

  return (
    <Flex className={s.searchPanel}>
      <Flex className={s.searchBlock}>
        <Input
          value={searchState.inputText}
          onChange={onChangeInputHandler}
          className={s.search}
          placeholder="Search"
        />
        <Select
          flex={1}
          data={inputSelectData}
          value={searchState.inputSelect.value}
          onChange={(_value, option) => {
            onChangeSelectHandler(option);
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
          onChange={onChangeStatusHandler}
          size="lg"
        />
        <SegmentedControl
          withItemsBorders={false}
          w={"60%"}
          data={genderValueData}
          value={searchState.genderValue}
          onChange={onChangeGenderHandler}
          size="lg"
        />
      </Flex>
    </Flex>
  );
};
