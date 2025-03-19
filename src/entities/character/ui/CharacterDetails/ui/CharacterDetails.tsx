import { Box, Flex, Image, Table, Title } from "@mantine/core";

import { withQueryStatus, withVirtualizer } from "@/shared/hocs";
import { VirtualItem } from "@tanstack/react-virtual";
import { ReactNode, useCallback, useMemo } from "react";

import s from "./CharacterDetails.module.scss";
import { ICharacterDetails } from "./types";
import { IWithQueryStatus } from "@/shared/hocs/withQueryStatus/types";

const TableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Table>
      <Table.Tbody className={s.tableBody}>{children}</Table.Tbody>
    </Table>
  );
};

const WithVirtualizerList = withVirtualizer({
  estimateSize: 50,
  overscan: 1,
})(TableContainer);

const BaseCharacterDetails = ({
  data,
}: ICharacterDetails & IWithQueryStatus) => {
  const finalData = useMemo(
    () =>
      data
        ? Object.entries(data).filter(([field]) => {
            return field !== "name" && field !== "id";
          })
        : [],
    [data]
  );

  const renderItem = useCallback(
    ({ index, size, start }: VirtualItem) => {
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
          <Table.Td>{String(info)}</Table.Td>
        </Table.Tr>
      );
    },
    [finalData]
  );

  return (
    <Flex flex={1} pos={"relative"} direction={"column"} h={"95%"} p={30}>
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
      <WithVirtualizerList
        itemsCount={finalData.length}
        renderItem={renderItem}
      />
    </Flex>
  );
};

export const CharacterDetails = withQueryStatus(BaseCharacterDetails);
