import { Flex, Image } from "@chakra-ui/react";

const OverlayImage = () => (
  <Flex
    zIndex="overlayImage"
    justifyContent="center"
    alignItems="center"
    pointerEvents={"none"}
    top={0}
    bottom={0}
    left={0}
    borderTopRightRadius={50}
    position="fixed"
    w="50%"
    backgroundColor="background.transparentViolet"
  >
    <Image src="/DoctorTasks.png" w={250} height={250} />
  </Flex>
);

export default OverlayImage;
