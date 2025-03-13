import { Flex, Input, SegmentedControl, Select } from "@mantine/core";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ISearchState } from "../../Container/types";
import s from "./Search.module.scss";
import { genderValueData, inputSelectData, statusValueData } from "./constants";
import { isGenderValueType, isStatusValueType } from "./predicates";

export const Search = ({
  searchState,
  setSearchState,
}: {
  searchState: ISearchState;
  setSearchState: Dispatch<SetStateAction<ISearchState>>;
}) => {
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchState({
      ...searchState,
      inputText: e.currentTarget.value,
      activePage: null,
    });
  };

  const onChangeSelectHandler = (option: {
    label: string;
    value: string;
    disabled?: boolean;
  }) => {
    setSearchState({ ...searchState, inputSelect: option, activePage: null });
  };

  const onChangeStatusHandler = (value: string) => {
    if (isStatusValueType(value)) {
      setSearchState({ ...searchState, statusValue: value, activePage: null });
    }
  };

  const onChangeGenderHandler = (value: string) => {
    if (isGenderValueType(value)) {
      setSearchState({ ...searchState, genderValue: value, activePage: null });
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
