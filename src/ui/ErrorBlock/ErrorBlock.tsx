import { Flex, Title } from "@mantine/core";
import { ReactNode } from "react";
import s from "./ErrorBlock.module.scss";

export const ErrorBlock = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex className={s.errorBlock}>
      <Title order={2}>Oops, an error occured!</Title>
      {children}
    </Flex>
  );
};
