import { VirtualItem } from "@tanstack/react-virtual";
import { ReactNode } from "react";

export interface IWithVirtualizer {
  estimateSize: number;
  overscan: number;
}

export interface IReturnedVirtualizer {
  itemsCount: number;
  ContainerComponent?: React.JSX.ElementType;
  renderItem: (virtualItem: VirtualItem) => ReactNode;
}
