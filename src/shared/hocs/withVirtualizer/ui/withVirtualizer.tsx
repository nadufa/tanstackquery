import { FC } from "react";
import { CreateVirtualList } from "./CreateVirtualList/CreateVirtualList";
import { IReturnedVirtualizer, IWithVirtualizer } from "./types";

export const withVirtualizer = ({
  estimateSize,
  overscan,
}: IWithVirtualizer): FC<IReturnedVirtualizer> => {
  return ({ ContainerComponent, renderItem, itemsCount }) =>
    CreateVirtualList({
      ContainerComponent,
      renderItem,
      estimateSize,
      itemsCount,
      overscan,
    });
};
