import { Box, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import s from "./App.module.scss";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Box bg={"grape"} size={500} className={s.app}>
        Hello world
      </Box>
    </MantineProvider>
  );
};
