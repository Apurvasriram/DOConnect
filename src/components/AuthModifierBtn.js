import { Button, useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../providers/AuthProvider";
import { useState } from "react";
import { ApiResult } from "../models";

const AuthModifierBtn = () => {
  const { isLoggedIn, signOut } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSignOut = () => {
    setIsLoading(true);
    signOut().then((apiResult) => {
      setIsLoading(false);
      toast({
        title:
          apiResult.status === ApiResult.SUCCESS
            ? "Signed out successfully"
            : apiResult.error,
        status: apiResult.status === ApiResult.SUCCESS ? "success" : "error",
        isClosable: true,
      });
    });
  };

  if (isLoggedIn) {
    return (
      <Button
        isLoading={isLoading}
        colorScheme="facebook"
        variant="solid"
        onClick={handleSignOut}
      >
        Logout
      </Button>
    );
  }

  return (
    <NavLink to="login-signup">
      <Button colorScheme="facebook" variant="solid">
        Login / SignUp
      </Button>
    </NavLink>
  );
};
export default AuthModifierBtn;
