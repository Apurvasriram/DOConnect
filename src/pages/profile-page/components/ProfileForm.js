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
  name: "",
  position: "",
  city: "",
};

const ProfileForm = ({ onCancelClicked, onSubmit }) => {
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
    if (
      formState.name === "" ||
      formState.position === "" ||
      formState.city === ""
    ) {
      showToast();
      return;
    }

    onSubmit(formState);
  };

  return (
    <Modal isOpen>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile Details</ModalHeader>

        <ModalBody>
          <FormControl m={2} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl m={2} isRequired>
            <FormLabel>Position</FormLabel>
            <Input
              value={formState.position}
              onChange={(e) =>
                setFormState({ ...formState, position: e.target.value })
              }
            />
          </FormControl>
          <FormControl m={2} isRequired>
            <FormLabel>City</FormLabel>
            <Input
              value={formState.city}
              onChange={(e) =>
                setFormState({ ...formState, city: e.target.value })
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

export default ProfileForm;
