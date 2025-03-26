import { useCharacterSettingsStore } from "@/entities/character";
import { Button } from "@/shared/ui";
import { Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

export const NotificationModal = () => {
  const notification = useCharacterSettingsStore((state) => state.notification);
  const setNotification = useCharacterSettingsStore(
    (state) => state.setNotification
  );

  const [opened, { open, close }] = useDisclosure(!!notification);

  const onCloseHandler = () => {
    setNotification(null);
    close();
  };

  useEffect(() => {
    if (notification) {
      open();
    }
  }, [notification]);

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
          <Modal.Header mb={"lg"}>
            <Text size={"22px"} fw={"bold"} ta={"center"}>
              {notification}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Flex w={"100%"} gap={"lg"} justify={"center"}>
              <Button onClick={onCloseHandler}>Ok</Button>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
