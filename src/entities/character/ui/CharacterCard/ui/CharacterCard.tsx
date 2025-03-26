import { useCharacterSettingsStore } from "@/entities/character";
import { DeleteCharacter } from "@/features";
import { withConsoleLog } from "@/shared/hocs";
import { Box, Flex, Image, Title } from "@mantine/core";
import clsx from "clsx";
import s from "./CharacterCard.module.scss";
import { ICharacterCard } from "./types";

const BaseCharacterCard = ({
  id,
  name,
  image,
  size,
  start,
}: ICharacterCard) => {
  const selectedId = useCharacterSettingsStore((state) => state.selectedId);
  const setSelectedId = useCharacterSettingsStore(
    (state) => state.setSelectedId
  );

  const selectCharacterHandler = () => {
    console.log("select");

    setSelectedId(id);
  };

  return (
    <Flex
      className={s.itemContainer}
      h={`${size}px`}
      style={{
        transform: `translateY(${start}px)`,
      }}
    >
      <Flex
        className={clsx(s.characterItem, selectedId === id && s.selected)}
        key={id}
        onClick={selectCharacterHandler}
      >
        <Image className={s.characterItemImg} src={image} />
        <Box>
          <Title order={3}>Name: {name}</Title>
          <Title order={3}>ID: {id}</Title>
        </Box>
        <DeleteCharacter name={name} id={id} />
      </Flex>
    </Flex>
  );
};

export const CharacterCard = withConsoleLog(BaseCharacterCard, "MyCard");
