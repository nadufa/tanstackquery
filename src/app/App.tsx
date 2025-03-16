import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "../pages";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </MantineProvider>
  );
};
