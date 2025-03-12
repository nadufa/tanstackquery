import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "../Container/Container";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Container />
      </QueryClientProvider>
    </MantineProvider>
  );
};
