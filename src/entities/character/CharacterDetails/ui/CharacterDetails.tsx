import { Box, Flex, Image, LoadingOverlay, Table, Title } from "@mantine/core";
import { useGetSelectedCharacter } from "../api/useGetSelectedCharacter";

import { ReactNode } from "react";
import { withVirtualizer } from "../../../../shared/hocs/withVirtualizer/ui/withVirtualizer";
import s from "./CharacterDetails.module.scss";
import { ICharacterDetails } from "./types";

const WithVirtualizerList = withVirtualizer({
  estimateSize: 50,
  overscan: 1,
});

const TableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Table>
      <Table.Tbody className={s.tableBody}>{children}</Table.Tbody>
    </Table>
  );
};

export const CharacterDetails = ({ selectedCharacter }: ICharacterDetails) => {
  const { data, isFetching } = useGetSelectedCharacter({
    selectedCharacterId: selectedCharacter,
  });

  // if (isError) {
  //   return (
  //     <ErrorBlock>
  //       <Button bg={"#7c609a"} size="lg" onClick={() => refetch()}>
  //         Try again
  //       </Button>
  //     </ErrorBlock>
  //   );
  // }

  // if (!selectedCharacter && !isFetching) {
  //   return (
  //     <Center h={"100%"} fz={"h3"} fw={"bold"}>
  //       Select character
  //     </Center>
  //   );
  // }

  // if (!data) {
  //   return (
  //     <Center h={"100%"} fz={"h3"} fw={"bold"}>
  //       No data
  //     </Center>
  //   );
  // }

  const finalData = data
    ? Object.entries(data).filter(([field]) => {
        return field !== "name" && field !== "id";
      })
    : [];

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

      {/* <ScrollArea.Autosize className={s.contentBody}> */}

      <WithVirtualizerList
        ContainerComponent={TableContainer}
        itemsCount={finalData.length}
        renderItem={({ index, size, start }) => {
          const [field, info] = finalData[index];

          return (
            <Table.Tr
              key={field}
              h={`${size}px`}
              pos={"absolute"}
              style={{
                top: 0,
                bottom: 0,
                width: "100%",
                transform: `translateY(${start}px)`,
              }}
            >
              <Table.Th>{field}</Table.Th>
              <Table.Td>{info}</Table.Td>
            </Table.Tr>
          );
        }}
      />

      {/* <Table>
          <Table.Tbody className={s.tableBody}>
            {Object.entries(data)
              .filter(([field]) => {
                return field !== "name" && field !== "id";
              })
              .map(([field, info]) => (
                <Table.Tr
                  key={field}
                  style={{
                    transform: `translateY(${start}px)`,
                  }}
                >
                  <Table.Th>{field}</Table.Th>
                  <Table.Td>{info}</Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table> */}
      {/* </ScrollArea.Autosize> */}
    </Flex>
  );
};
