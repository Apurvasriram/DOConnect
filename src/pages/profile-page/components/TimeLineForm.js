import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const initialValues = {
  title: "",
  subtitle: "",
};

const TimeLineForm = ({ onCancelClicked, onSubmit, heading }) => {
  const [formState, setFormState] = useState(initialValues);

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "All fields are required",
      status: "error",
      isClosable: true,
    });
  };

  const handleClick = () => {
    if (formState.title === "" || formState.subtitle === "") {
      showToast();
      return;
    }

    handleSubmit();
  };

  const handleSubmit = () => onSubmit(formState.title, formState.subtitle);

  return (
    <Modal isOpen>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Add ${heading}`}</ModalHeader>

        <ModalBody>
          <FormControl m={2} isRequired>
            <FormLabel>Organization Name / Designation</FormLabel>
            <Input
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
            />
          </FormControl>
          <FormControl m={2} isRequired>
            <FormLabel>Experience</FormLabel>
            <Input
              value={formState.subtitle}
              onChange={(e) =>
                setFormState({ ...formState, subtitle: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onCancelClicked}>
            Close
          </Button>
          <Button onClick={handleClick}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TimeLineForm;
