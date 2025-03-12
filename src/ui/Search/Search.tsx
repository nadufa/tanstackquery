import { Flex, Input, SegmentedControl, Select } from "@mantine/core";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ISearchState } from "../../Container/Container";
import s from "./Search.module.scss";

export const Search = ({
  searchState,
  setSearchState,
}: {
  searchState: ISearchState;
  setSearchState: Dispatch<SetStateAction<ISearchState>>;
}) => {
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchState({ ...searchState, inputText: e.currentTarget.value });
  };

  const onChangeSelectHandler = (option: {
    label: string;
    value: string;
    disabled?: boolean;
  }) => {
    setSearchState({ ...searchState, inputSelect: option });
  };

  const onChangeStatusHandler = (value: string) => {
    setSearchState({ ...searchState, statusValue: value });
  };

  const onChangeGenderHandler = (value: string) => {
    setSearchState({ ...searchState, genderValue: value });
  };

  return (
    <Flex className={s.searchPanel}>
      <Flex className={s.searchBlock}>
        <Input
          value={searchState.inputText}
          onChange={(e) => onChangeInputHandler(e)}
          className={s.search}
          placeholder="Search"
        />
        <Select
          flex={1}
          data={[
            { value: "name", label: "Name" },
            { value: "species", label: "Species" },
            { value: "type", label: "Type" },
          ]}
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
          data={[
            { value: "all", label: "All" },
            { value: "alive", label: "Alive" },
            { value: "dead", label: "Dead" },
            { value: "unknown", label: "Unknown" },
          ]}
          onChange={(value) => {
            onChangeStatusHandler(value);
          }}
          size="lg"
        />
        <SegmentedControl
          withItemsBorders={false}
          w={"60%"}
          data={[
            { value: "all", label: "All" },
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "genderless", label: "Genderless" },
            { value: "unknown", label: "Unknown" },
          ]}
          onChange={(value) => {
            onChangeGenderHandler(value);
          }}
          size="lg"
        />
      </Flex>
    </Flex>
  );
};
