import { Flex } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { IReturnedVirtualizer, IWithVirtualizer } from "../types";
import s from "./CreateVirtualList.module.scss";

export const CreateVirtualList = ({
  ContainerComponent,
  renderItem,
  estimateSize,
  itemsCount,
  overscan,
}: IReturnedVirtualizer & IWithVirtualizer) => {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: itemsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  const virtualItemsData = virtualizer
    .getVirtualItems()
    .map((virtualItem) => renderItem(virtualItem));

  return (
    <Flex ref={parentRef} className={s.contentContainer}>
      <Flex className={s.content} h={`${virtualizer.getTotalSize()}px`}>
        {ContainerComponent ? (
          <ContainerComponent>{virtualItemsData}</ContainerComponent>
        ) : (
          virtualItemsData
        )}
      </Flex>
    </Flex>
  );
};
