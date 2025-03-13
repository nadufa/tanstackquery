import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  LoadingOverlay,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useGetSelectedCharacter } from "../../api/useGetSelectedCharacter";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";

import s from "./Details.module.scss";

export const Details = ({
  selectedCharacter,
}: {
  selectedCharacter: number | null;
}) => {
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
    <Flex flex={1} pos={"relative"} direction={"column"} h={"95%"}>
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ blur: 1 }}
        loaderProps={{ color: "#7c609a", size: 100 }}
      />
      <Box h={"30%"} p={0}>
        <Image h={"100%"} fit="fill" src={data?.image} />
      </Box>

      <ScrollArea.Autosize className={s.contentBody}>
        <Table>
          <Table.Tbody>
            {Object.entries(data).map(([field, info]) => (
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
