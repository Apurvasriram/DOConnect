import * as Yup from "yup";

const loginSchema = {
  email: Yup.string()
    .required("This field is required")
    .email("Please enter valid email"),
  password: Yup.string()
    .required("This field is required")
    .min(8, "Password must be atleast 8 characters")
    .max(20, "Password should be less than 20 characters"),
};

export const loginValidationSchema = Yup.object(loginSchema);

export const signUpValidationSchema = Yup.object({
  ...loginSchema,
  confirmPassword: Yup.string()
    .required("Please retype your password")
    .oneOf([Yup.ref("password")], "Your passwords do not match"),
});
