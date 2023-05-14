import { Flex } from "@chakra-ui/react";

import OverlayImage from "../../components/OverlayImage";
import LoginSignupForm from "./components/LoginSignupForm";

const LoginSignupPage = () => {
  return (
    <Flex justifyContent="flex-end">
      <OverlayImage />
      <Flex w="50%" flexDirection="column" alignItems="center">
        <LoginSignupForm />
      </Flex>
    </Flex>
  );
};

export default LoginSignupPage;
