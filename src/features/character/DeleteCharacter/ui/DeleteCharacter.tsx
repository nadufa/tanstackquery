import { Button } from "@/shared/ui";
import { ActionIcon, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TrashIcon } from "../assets";
import s from "./DeleteCharacter.module.scss";

export const DeleteCharacter = ({ name, id }: { name: string; id: number }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const onDeleteHandler = () => {
    alert(`Delete character with ID: ${id}`);
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
        <Modal.Content radius={"lg"} p={"xs"}>
          <Modal.Header mb={"lg"}>
            <Text size={"22px"} fw={"bold"} ta={"center"}>
              Are you sure you want to delete the character "{name}"?
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Flex w={"100%"} gap={"lg"} justify={"center"}>
              <Button h={50} onClick={close}>
                No
              </Button>
              <Button onClick={onDeleteHandler}>Yes</Button>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <ActionIcon className={s.deleteButton} onClick={open}>
        <TrashIcon />
      </ActionIcon>
    </>
  );
};
