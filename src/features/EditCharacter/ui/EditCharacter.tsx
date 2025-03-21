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
import s from "./EditCharacter.module.scss";
import { IEditCharacter } from "./types";

export const EditCharacter = ({ data }: IEditCharacter) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { name, gender, status, id, species } = data;

  const onEditHandler = () => {
    alert(`Edit character with ID: ${id}`);
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
                Edit character info
              </Text>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className={s.body}>
            <TextInput
              radius={10}
              size="lg"
              label="Name"
              placeholder="Name"
              value={name}
            />
            <Box w={"100%"}>
              <Text size="lg" fw={500}>
                Species
              </Text>
              <Select
                data={speciesSelectData}
                value={species}
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
                value={status}
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
                value={gender}
                onChange={() => {}}
                size="md"
                fullWidth
              />
            </Box>

            <Button fullWidth onClick={onEditHandler}>
              Save changes
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Edit character</Button>
    </>
  );
};
