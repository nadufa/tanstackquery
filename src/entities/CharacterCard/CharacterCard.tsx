import { Box, Flex, Image, Title } from "@mantine/core";
import clsx from "clsx";
import s from "./CharacterCard.module.scss";
import { ICharacterCard } from "./types";

export const CharacterCard = ({
  id,
  name,
  image,
  selectedCharacter,
  index,
  size,
  start,
  setSelectedCharacter,
}: ICharacterCard) => {
  const selectCharacterHandler = (id: number) => {
    setSelectedCharacter(selectedCharacter === id ? null : id);
  };

  return (
    <Flex
      key={index}
      className={s.itemContainer}
      h={`${size}px`}
      style={{
        transform: `translateY(${start}px)`,
      }}
    >
      <Flex
        className={clsx(
          s.characterItem,
          selectedCharacter === id && s.selected
        )}
        key={id}
        onClick={() => selectCharacterHandler(id)}
      >
        <Image className={s.characterItemImg} src={image} />
        <Box>
          <Title order={3}>Name: {name}</Title>
          <Title order={3}>ID: {id}</Title>
        </Box>
      </Flex>
    </Flex>
  );
};
