import { Button as MantineButton } from "@mantine/core";
import { IButton } from "./types";

export const Button = ({ children, onClick, ...restProps }: IButton) => {
  return (
    <MantineButton size="lg" bg={"#7c609a"} onClick={onClick} {...restProps}>
      {children}
    </MantineButton>
  );
};
