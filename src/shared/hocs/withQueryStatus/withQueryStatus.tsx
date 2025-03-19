import { ErrorBlock } from "@/shared/ui";
import { Box, Center, LoadingOverlay } from "@mantine/core";
import { ComponentType } from "react";
import { IWithQueryStatus } from "./types";

export const withQueryStatus = <T extends IWithQueryStatus>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const {
      isLoading,
      isError,
      isEmptyData,
      emptyDataLabel,
      errorBlockChildren,
    } = props;
    if (isLoading) {
      return (
        <Box pos={"relative"} flex={1}>
          <LoadingOverlay
            visible
            overlayProps={{ blur: 1 }}
            loaderProps={{ color: "#7c609a", size: 100 }}
          />
        </Box>
      );
    }

    if (isError) {
      return errorBlockChildren ? (
        <ErrorBlock>{errorBlockChildren}</ErrorBlock>
      ) : (
        <ErrorBlock />
      );
    }

    if (isEmptyData) {
      return (
        <Center h={"100%"} fz={"h3"} fw={"bold"}>
          {emptyDataLabel ?? "No data"}
        </Center>
      );
    }

    return <Component {...props} />;
  };
};
