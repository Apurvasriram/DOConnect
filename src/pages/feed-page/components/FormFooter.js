import { AttachmentIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { useState, useRef } from "react";

import PreviewImages from "./PreviewImages";

const FormFooter = ({ onSubmit }) => {
  const [images, setImageFiles] = useState([]);
  const inputRef = useRef(null);

  const removeImage = (index) => {
    setImageFiles((prevImages) => [
      ...prevImages.slice(0, index),
      ...prevImages.slice(index + 1),
    ]);
  };

  return (
    <Flex p={2} alignItems="flex-end">
      <IconButton
        backgroundColor="white"
        icon={<AttachmentIcon />}
        onClick={() => inputRef.current?.click()}
      />
      <Input
        ref={inputRef}
        onChange={(e) =>
          setImageFiles((files) => [
            ...files,
            {
              ...e.target.files[0],
              url: URL.createObjectURL(e.target.files[0]),
            },
          ])
        }
        display="none"
        type="file"
        multiple
        accept="image/*"
      />
      <Flex justifyContent="center" flex={1}>
        <PreviewImages imageFiles={images} onImageClicked={removeImage} />
      </Flex>
      <Button
        colorScheme="facebook"
        onClick={() => {
          setImageFiles([]);
          onSubmit(images);
        }}
      >
        Post
      </Button>
    </Flex>
  );
};

export default FormFooter;
