import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  LoadingOverlay,
  ScrollArea,
  Table,
  Title,
} from "@mantine/core";
import { useGetSelectedCharacter } from "../api/useGetSelectedCharacter";

import { ErrorBlock } from "../../../../shared/ui";
import s from "./CharacterDetails.module.scss";
import { ICharacterDetails } from "./types";

export const CharacterDetails = ({ selectedCharacter }: ICharacterDetails) => {
  const { data, isFetching, isError, refetch } = useGetSelectedCharacter({
    selectedCharacterId: selectedCharacter,
  });

  if (isError) {
    return (
      <ErrorBlock>
        <Button bg={"#7c609a"} size="lg" onClick={() => refetch()}>
          Try again
        </Button>
      </ErrorBlock>
    );
  }

  if (!selectedCharacter && !isFetching) {
    return (
      <Center h={"100%"} fz={"h3"} fw={"bold"}>
        Select character
      </Center>
    );
  }

  if (!data) {
    return (
      <Center h={"100%"} fz={"h3"} fw={"bold"}>
        No data
      </Center>
    );
  }

  return (
    <Flex flex={1} pos={"relative"} direction={"column"} h={"95%"} p={30}>
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ blur: 1 }}
        loaderProps={{ color: "#7c609a", size: 100 }}
      />
      <Flex align={"center"} justify={"center"} gap={50} h={"300px"} p={0}>
        <Image
          className={s.characterImg}
          src={data?.image}
          style={{ borderRadius: "50px" }}
        />
        <Box>
          <Title order={3}>Name: {data?.name}</Title>
          <Title order={3}>ID: {data?.id}</Title>
        </Box>
      </Flex>

      <ScrollArea.Autosize className={s.contentBody}>
        <Table>
          <Table.Tbody className={s.tableBody}>
            {Object.entries(data)
              .filter(([field]) => {
                return field !== "name" && field !== "id";
              })
              .map(([field, info]) => (
                <Table.Tr key={field}>
                  <Table.Th>{field}</Table.Th>
                  <Table.Td>{info}</Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
      </ScrollArea.Autosize>
    </Flex>
  );
};
