import { Flex, Image, LoadingOverlay, ScrollArea, Title } from "@mantine/core";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ICharactersData } from "../../api/types";
import s from "./List.module.scss";

export const List = ({
  data,
  isFetching,
  selectedCharacter,
  setSelectedCharacter,
}: {
  data?: ICharactersData;
  isFetching: boolean;
  selectedCharacter: number | null;
  setSelectedCharacter: Dispatch<SetStateAction<null | number>>;
}) => {
  const selectCharacterHandler = (id: number) => {
    setSelectedCharacter(selectedCharacter === id ? null : id);
  };

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
      {!data && !isFetching
        ? "no data"
        : data?.results.map(({ name, image, id }) => {
            return (
              <Flex
                className={clsx(
                  s.characterItem,
                  selectedCharacter === id && s.selected
                )}
                key={name}
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
