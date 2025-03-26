import { TrashIcon } from "@/shared/assets";
import { Button } from "@/shared/ui";
import { ActionIcon, Flex, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteCharacter } from "../api";
import s from "./DeleteCharacter.module.scss";
import { EventType, IDeleteCharacter } from "./types";

export const DeleteCharacter = ({ name, id }: IDeleteCharacter) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isPending } = useDeleteCharacter({
    name,
    id,
    onSettled: close,
  });

  const onDeleteHandler = (e: EventType) => {
    e.stopPropagation();
    mutate();
  };

  const onOpenHandler = (e: EventType) => {
    e.stopPropagation();
    open();
  };

  const onCloseHandler = (e: EventType) => {
    e.stopPropagation();
    close();
  };

  return (
    <>
      <Modal.Root
        size={"sm"}
        opened={opened}
        onClose={close}
        centered
        zIndex={1000}
      >
        <Modal.Overlay />
        <Modal.Content radius={"lg"} p={"xs"} pos={"relative"}>
          <LoadingOverlay
            visible={isPending}
            overlayProps={{ backgroundOpacity: 1 }}
            loaderProps={{ color: "#7c609a", size: 80 }}
            zIndex={1001}
          />
          <Modal.Header mb={"lg"}>
            <Text size={"22px"} fw={"bold"} ta={"center"}>
              Are you sure you want to delete the character "{name}"?
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Flex w={"100%"} gap={"lg"} justify={"center"}>
              <Button h={50} onClick={onCloseHandler}>
                No
              </Button>
              <Button onClick={onDeleteHandler}>Yes</Button>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <ActionIcon className={s.deleteButton} onClick={onOpenHandler}>
        <TrashIcon />
      </ActionIcon>
    </>
  );
};
