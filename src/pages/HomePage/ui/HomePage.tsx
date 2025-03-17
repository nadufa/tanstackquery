import { Flex } from "@mantine/core";
import { Container } from "../../../widgets";
import s from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <Flex className={s.main}>
      <Container />
    </Flex>
  );
};
