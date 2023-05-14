import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Image } from "@chakra-ui/react";
import { useState } from "react";

const PreviewImage = ({ onClick, id, src }) => {
  const [showDeleteIcon, setVisibility] = useState(false);

  return (
    <Box
      id={id}
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
      borderRadius="3xl"
      mx={1}
      width={100}
      height={100}
    >
      {showDeleteIcon ? (
        <IconButton
          onClick={() => onClick(id)}
          colorScheme="red"
          w="full"
          h="full"
          icon={<DeleteIcon />}
        />
      ) : (
        <Image w="full" h="full" src={src} />
      )}
    </Box>
  );
};

export default PreviewImage;
