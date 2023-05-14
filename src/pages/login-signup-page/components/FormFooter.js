import { Button, CardFooter, Flex, Text } from "@chakra-ui/react";

const FormFooter = ({
  isLoading,
  isSignUpForm,
  onResetForm,
  setIsSignUpForm,
}) => {
  return (
    <CardFooter>
      <Flex alignItems="center">
        <Button isLoading={isLoading} type="submit" variant="navCardBtn">
          {isSignUpForm ? "Sign Up" : "Login"}
        </Button>
        {!isLoading && (
          <>
            <Text>or</Text>&nbsp;
            <Text
              onClick={() => {
                onResetForm();
                if (isSignUpForm) {
                  setIsSignUpForm(false);
                } else {
                  setIsSignUpForm(true);
                }
              }}
              cursor="pointer"
              fontWeight={"bold"}
              _hover={{ textDecoration: "underline" }}
              variant={"heading5"}
            >
              {isSignUpForm ? "Login" : "SignUp"}
            </Text>
          </>
        )}
        &nbsp;
      </Flex>
    </CardFooter>
  );
};

export default FormFooter;
