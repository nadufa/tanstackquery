import { Button } from "@/shared/ui";
import {
  Box,
  Modal,
  SegmentedControl,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { genderValueData, speciesSelectData, statusValueData } from "../lib";
import s from "./AddNewCharacter.module.scss";

export const AddNewCharacter = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const onCreateHandler = () => {
    alert(`Create character`);
    close();
  };

  return (
    <>
      <Modal.Root
        size={"lg"}
        opened={opened}
        onClose={close}
        centered
        zIndex={1000}
      >
        <Modal.Overlay />
        <Modal.Content radius={"lg"}>
          <Modal.Header>
            <Modal.Title>
              <Text size={"22px"} fw={"bold"}>
                New character info
              </Text>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className={s.body}>
            <TextInput radius={10} size="lg" label="Name" placeholder="Name" />
            <Box w={"100%"}>
              <Text size="lg" fw={500}>
                Species
              </Text>
              <Select
                data={speciesSelectData}
                value={"Human"}
                onChange={(_value, option) => {
                  console.log(option);
                }}
                size="lg"
              />
            </Box>

            <Box w={"100%"}>
              <Text size="lg" fw={500}>
                Status
              </Text>
              <SegmentedControl
                radius={10}
                withItemsBorders={false}
                data={statusValueData}
                value={"alive"}
                onChange={() => {}}
                size="md"
                fullWidth
              />
            </Box>
            <Box w={"100%"}>
              <Text size="lg" fw={500}>
                Gender
              </Text>
              <SegmentedControl
                radius={10}
                withItemsBorders={false}
                data={genderValueData}
                value={"female"}
                onChange={() => {}}
                size="md"
                fullWidth
              />
            </Box>

            <Button fullWidth onClick={onCreateHandler}>
              Add
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button h={"95%"} onClick={open}>
        Add new character
      </Button>
    </>
  );
};
