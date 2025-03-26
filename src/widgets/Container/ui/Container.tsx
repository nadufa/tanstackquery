import {
  useCharacterSettingsStore,
  useGetCharacters,
} from "@/entities/character";
import { AddNewCharacter, SearchBar } from "@/features";
import { Button, NotificationModal } from "@/shared/ui";
import { CharacterInfo, CharactersList } from "@/widgets";
import { Flex, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";
import s from "./Container.module.scss";

export const Container = () => {
  console.log("Container");

  const searchState = useCharacterSettingsStore(
    useShallow((state) => state.searchState)
  );

  const [debounced] = useDebouncedValue(searchState.inputText, 1000);
  const {
    data,
    isFetching,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCharacters({
    ...searchState,
    inputText: debounced,
  });

  return (
    <Flex className={s.container}>
      <NotificationModal />
      <SearchBar />
      <Flex className={s.contentBlock}>
        <Flex className={clsx(s.list, s.contentPart)}>
          <Flex className={s.contentHeader}>
            <Title order={2}>List of characters</Title>
            <AddNewCharacter />
          </Flex>

          <CharactersList
            data={data ? data.pages : []}
            isError={isError}
            isLoading={isFetching && !isFetchingNextPage}
            errorBlockChildren={
              <Button onClick={() => refetch()}>Try again</Button>
            }
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </Flex>

        <Flex className={clsx(s.details, s.contentPart)}>
          <Flex className={s.contentHeader}>
            <Title order={2}>Character information</Title>
          </Flex>
          <CharacterInfo />
        </Flex>
      </Flex>
    </Flex>
  );
};
