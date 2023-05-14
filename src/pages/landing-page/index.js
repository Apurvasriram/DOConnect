import { Flex } from "@chakra-ui/react";

import OverlayImage from "../../components/OverlayImage";
import NavBoard from "./components/NavBoard";

const LandingPage = () => {
  return (
    <Flex justifyContent="flex-end">
      <OverlayImage />
      <Flex w="50%" flexDirection="column" alignItems="center">
        <NavBoard />
      </Flex>
    </Flex>
  );
};

export default LandingPage;
