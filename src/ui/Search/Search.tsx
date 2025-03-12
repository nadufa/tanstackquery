import { Flex, Input } from "@mantine/core";
import s from "./Search.module.scss";

export const Search = () => {
  return (
    <Flex className={s.searchBlock}>
      <Input className={s.search} placeholder="Search" />
    </Flex>
  );
};
