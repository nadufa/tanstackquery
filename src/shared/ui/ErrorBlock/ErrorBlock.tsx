import { Flex, Title } from "@mantine/core";
import s from "./ErrorBlock.module.scss";
import { IErrorBlock } from "./types";

export const ErrorBlock = ({ children }: IErrorBlock) => {
  return (
    <Flex className={s.errorBlock}>
      <Title order={2}>Oops, an error occured!</Title>
      {children}
    </Flex>
  );
};
