import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from "@mantine/core";
import { MouseEvent } from "react";

export interface IButton extends MantineButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, onClick, ...restProps }: IButton) => {
  return (
    <MantineButton size="lg" bg={"#7c609a"} onClick={onClick} {...restProps}>
      {children}
    </MantineButton>
  );
};
