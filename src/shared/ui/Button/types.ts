import { ButtonProps as MantineButtonProps } from "@mantine/core";
import { MouseEvent } from "react";

export interface IButton extends MantineButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
