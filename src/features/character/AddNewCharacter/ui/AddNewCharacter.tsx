import {
  Button,
  ControlledInput,
  ControlledSegmentedControl,
  ControlledSelect,
} from "@/shared/ui";
import { Box, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { genderValueData, speciesSelectData, statusValueData } from "../../lib";
import { ICharacterSchema } from "../../model";
import { useAddNewCharacter } from "../lib";
import s from "./AddNewCharacter.module.scss";

export const AddNewCharacter = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit, reset } = useAddNewCharacter();

  const onCloseModal = () => {
    close();
    reset();
  };

  const onSubmitForm = (data: ICharacterSchema) => {
    console.log(data);
    close();
    reset();
  };

  return (
    <>
      <Modal.Root size={"lg"} opened={opened} onClose={onCloseModal} centered>
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
          <Modal.Body>
            <form className={s.form} onSubmit={handleSubmit(onSubmitForm)}>
              <ControlledInput
                control={control}
                name={"name"}
                radius={10}
                size="lg"
                label="Name"
                placeholder="Name"
              />

              <ControlledInput
                control={control}
                name={"type"}
                radius={10}
                size="lg"
                label="Type"
                placeholder="Type"
              />

              <ControlledInput
                control={control}
                name={"image"}
                radius={10}
                size="lg"
                label="Image"
                placeholder="Image"
              />

              <Box w={"100%"}>
                <Text size="lg" fw={500}>
                  Species
                </Text>
                <ControlledSelect
                  control={control}
                  name={"species"}
                  data={speciesSelectData}
                  size="lg"
                  allowDeselect={false}
                />
              </Box>

              <Box w={"100%"}>
                <Text size="lg" fw={500}>
                  Status
                </Text>
                <ControlledSegmentedControl
                  name={"status"}
                  radius={10}
                  withItemsBorders={false}
                  data={statusValueData}
                  size="md"
                  control={control}
                  fullWidth
                />
              </Box>

              <Box w={"100%"}>
                <Text size="lg" fw={500}>
                  Gender
                </Text>
                <ControlledSegmentedControl
                  name={"gender"}
                  radius={10}
                  control={control}
                  withItemsBorders={false}
                  data={genderValueData}
                  size="md"
                  fullWidth
                />
              </Box>

              <Button type={"submit"} fullWidth>
                Add
              </Button>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button h={"95%"} onClick={open}>
        Add new character
      </Button>
    </>
  );
};
