import {
  Button,
  Center,
  Flex,
  Image,
  LoadingOverlay,
  ScrollArea,
  Title,
} from "@mantine/core";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ICharactersData } from "../../api/types";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import s from "./List.module.scss";

export const List = ({
  data,
  refetch,
  isFetching,
  isError,
  selectedCharacter,
  setSelectedCharacter,
}: {
  data?: ICharactersData;
  refetch: () => void;
  selectedCharacter: number | null;
  isFetching: boolean;
  isError: boolean;
  setSelectedCharacter: Dispatch<SetStateAction<null | number>>;
}) => {
  const selectCharacterHandler = (id: number) => {
    setSelectedCharacter(selectedCharacter === id ? null : id);
  };

  if (isError) {
    return (
      <ErrorBlock>
        <Button bg={"#7c609a"} size="lg" onClick={() => refetch()}>
          Try again
        </Button>
      </ErrorBlock>
    );
  }

  if (!data && !isFetching) {
    return <Center>No data</Center>;
  }

  return (
    <ScrollArea
      className={s.contentBody}
      offsetScrollbars={"y"}
      type={"always"}
    >
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ blur: 1 }}
        loaderProps={{ color: "#7c609a", size: 100 }}
      />
      {data &&
        data.results.map(({ name, image, id }) => {
          return (
            <Flex
              className={clsx(
                s.characterItem,
                selectedCharacter === id && s.selected
              )}
              key={id}
              onClick={() => selectCharacterHandler(id)}
            >
              <Image className={s.characterItemImg} src={image} />
              <Title order={3}>Name: {name}</Title>
            </Flex>
          );
        })}
    </ScrollArea>
  );
};
