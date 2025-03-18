import { Flex } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ComponentType, ReactNode, useRef } from "react";
import { IWithVirtualizer, IWithVirtualizerConfig } from "./types";
import s from "./Virtualizer.module.scss";

export const withVirtualizer = ({
  estimateSize,
  overscan,
}: IWithVirtualizerConfig) => {
  return (WrappedComponent?: ComponentType<{ children: ReactNode }>) => {
    return ({ itemsCount, renderItem, loadMoreBlock }: IWithVirtualizer) => {
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
          <Flex
            className={s.content}
            h={`${virtualizer.getTotalSize() + (loadMoreBlock ? 50 : 0)}px`}
          >
            {WrappedComponent ? (
              <WrappedComponent>{virtualItemsData}</WrappedComponent>
            ) : (
              virtualItemsData
            )}
            {loadMoreBlock ?? null}
          </Flex>
        </Flex>
      );
    };
  };
};
