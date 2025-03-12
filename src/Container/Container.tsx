import { Box, Button, Flex, Input, Title } from "@mantine/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useGetCharacters } from "../api/useGetCharacters";
import s from "./Container.module.scss";
import { List } from "./List/List";

export const Container = () => {
  const { data, isFetching, isError, refetch } = useGetCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Flex className={s.main}>
      <Flex className={s.container}>
        <Flex className={s.searchBlock}>
          <Input className={s.search} placeholder="Search" />
        </Flex>
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
      </Flex>
    </Flex>
  );
};
