import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { useGetCharacters } from "../api/useGetCharacters";
import { Content } from "../ui/Content/Content";
import { Search } from "../ui/Search/Search";
import s from "./Container.module.scss";

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
        <Search />
        <Content
          data={data}
          isFetching={isFetching}
          refetch={refetch}
          isError={isError}
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
        />
      </Flex>
    </Flex>
  );
};
