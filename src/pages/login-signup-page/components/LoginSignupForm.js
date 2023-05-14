import { Card, VStack, CardHeader, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Formik } from "formik";

import { loginValidationSchema, signUpValidationSchema } from "../schema";
import EmailInput from "./FormInput";
import PasswordInput from "./FormInput";
import ConfirmPasswordInput from "./FormInput";
import { useAuthContext } from "../../../providers/AuthProvider";
import { ApiResult } from "../../../models";
import FormFooter from "./FormFooter";

const message = {
  login: "Hey!! Login to DOConnect.",
  signup: "Hey!! SignUp on DOConnect.",
};

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const getValuesByFormType = (isSignUpForm) => {
  const { confirmPassword, ...restOfForm } = initialValues;
  return isSignUpForm ? initialValues : restOfForm;
};

const LoginSignupForm = () => {
  const { signUp, signIn } = useAuthContext();
  const toast = useToast();

  const [isSignUpForm, setIsSignUpForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data, actions) => {
    setIsLoading(true);
    if (isSignUpForm) {
      signUp(data.email, data.password).then((apiResult) => {
        console.log(apiResult);
        setIsLoading(false);
        showToast(true, apiResult);
      });
    } else {
      signIn(data.email, data.password).then((apiResult) => {
        console.log(apiResult);
        setIsLoading(false);
        showToast(false, apiResult);
      });
    }
    actions.resetForm();
  };

  const showToast = (isSignUp, apiResult) => {
    toast({
      title:
        apiResult.status === ApiResult.SUCCESS
          ? getSuccessMessageByFormType(isSignUp)
          : apiResult.error.message,
      status: apiResult.status === ApiResult.SUCCESS ? "success" : "error",
      isClosable: true,
    });
  };

  const getSuccessMessageByFormType = (isSignUp) =>
    isSignUp ? "Registered successfully" : "Logged in successfully";

  const initialValuesByFormType = getValuesByFormType(isSignUpForm);

  return (
    <Formik
      initialValues={initialValuesByFormType}
      onSubmit={onSubmit}
      validationSchema={
        isSignUpForm ? signUpValidationSchema : loginValidationSchema
      }
    >
      {({
        resetForm,
        handleReset,
        handleSubmit,
        handleBlur,
        handleChange,
        errors,
        touched,
        values,
      }) => {
        return (
          <Card
            as="form"
            onSubmit={handleSubmit}
            mt={2}
            px={5}
            align="center"
            backgroundColor={"background.gray"}
          >
            <CardHeader>
              <Heading color={"title.form"} variant="h4" fontWeight="bold">
                {isSignUpForm ? message.signup : message.login}
              </Heading>
            </CardHeader>
            <VStack maxW={300} spacing={5} mb={3} w="full">
              <EmailInput
                name="email"
                type="email"
                value={values.email}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleReset={handleReset}
                error={errors.email}
                touched={touched.email}
              />
              <PasswordInput
                name="password"
                type="password"
                value={values.password}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleReset={handleReset}
                error={errors.password}
                touched={touched.password}
              />
              {isSignUpForm && (
                <ConfirmPasswordInput
                  value={values.confirmPassword}
                  label="Confirm Password"
                  placeholder="Confirm your Password"
                  name="confirmPassword"
                  type="password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleReset={handleReset}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              )}
            </VStack>
            <FormFooter
              isLoading={isLoading}
              isSignUpForm={isSignUpForm}
              onResetForm={resetForm}
              setIsSignUpForm={setIsSignUpForm}
            />
          </Card>
        );
      }}
    </Formik>
  );
};

export default LoginSignupForm;
