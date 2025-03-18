import { Center } from "@mantine/core";
import { Button } from "../../../../shared/ui";
import { LoadMoreType } from "./types";

export const LoadMoreBlock = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: LoadMoreType) => {
  return hasNextPage ? (
    <Button
      fullWidth
      pos={"absolute"}
      bottom={0}
      onClick={() => fetchNextPage()}
      loading={isFetchingNextPage}
    >
      Load more
    </Button>
  ) : (
    <Center
      pos={"absolute"}
      bottom={0}
      bg={"gray"}
      w={"100%"}
      fz={"h3"}
      fw={"bold"}
      h={50}
    >
      No more data
    </Center>
  );
};
