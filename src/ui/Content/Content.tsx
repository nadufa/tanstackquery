import { Box, Button, Flex, Title } from "@mantine/core";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ICharactersData } from "../../api/types";
import { List } from "../List/List";
import s from "./Content.module.scss";

export const Content = ({
  data,
  selectedCharacter,
  setSelectedCharacter,
  refetch,
  isFetching,
  isError,
}: {
  data?: ICharactersData;
  selectedCharacter: number | null;
  setSelectedCharacter: Dispatch<SetStateAction<null | number>>;
  refetch: () => void;
  isFetching: boolean;
  isError: boolean;
}) => {
  return (
    <Flex className={s.contentBlock}>
      <Flex className={clsx(s.list, s.contentPart)}>
        <Box className={s.contentHeader}>
          <Title order={2}>List of characters</Title>
        </Box>
        {isError ? (
          <Flex className={s.errorBlock}>
            <Title order={2}>Oops, an error occured!</Title>
            <Button bg={"#7c609a"} size="lg" onClick={() => refetch()}>
              Try again
            </Button>
          </Flex>
        ) : (
          <List
            data={data}
            isFetching={isFetching}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
          />
        )}
      </Flex>
      <Flex className={clsx(s.details, s.contentPart)}>
        <Box className={s.contentHeader}>
          <Title order={2}>Character information</Title>
        </Box>
      </Flex>
    </Flex>
  );
};
