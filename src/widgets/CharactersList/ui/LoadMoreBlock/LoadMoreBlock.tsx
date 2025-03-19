import { Button } from "@/shared/ui";
import { Center } from "@mantine/core";
import s from "./LoadMoreBlock.module.scss";
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
      className={s.content}
      onClick={() => fetchNextPage()}
      loading={isFetchingNextPage}
    >
      Load more
    </Button>
  ) : (
    <Center className={s.content} bg={"#fff"} fz={"h3"} fw={"bold"}>
      No more data
    </Center>
  );
};
