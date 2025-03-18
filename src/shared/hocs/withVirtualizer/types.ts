import { VirtualItem } from "@tanstack/react-virtual";
import { JSX, ReactNode } from "react";

export interface IWithVirtualizerConfig {
  estimateSize: number;
  overscan: number;
}

export interface IWithVirtualizer {
  itemsCount: number;
  renderItem: (item: VirtualItem) => JSX.Element;
  loadMoreBlock?: ReactNode;
}
