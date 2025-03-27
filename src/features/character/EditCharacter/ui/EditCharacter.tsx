import { ICharacter } from "@/entities/character";
import { Button, ControlledInput, ControlledSelect } from "@/shared/ui";
import { Box, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { speciesSelectData } from "../../lib";
import { useEditCharacter } from "../api";
import { useEditCharacterForm } from "../lib";
import { IEditCharacterSchema } from "../model";
import s from "./EditCharacter.module.scss";

export const EditCharacter = ({ data }: { data: ICharacter }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit, reset } = useEditCharacterForm(data);

  const { mutate, isPending } = useEditCharacter({
    id: data.id,
    name: data.name,
    onSettled: close,
  });

  const onCloseModal = () => {
    close();
    reset();
  };

  const onSubmitForm = (data: IEditCharacterSchema) => {
    mutate(data);
  };

  return (
    <>
      <Modal.Root size={"lg"} opened={opened} onClose={onCloseModal} centered>
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

              <Button type={"submit"} fullWidth loading={isPending}>
                Save changes
              </Button>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Edit character</Button>
    </>
  );
};
