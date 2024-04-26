import * as Yup from "yup";

// Yup validation schema for email
export const emailValidationSchema = Yup.string()
  .email("Enter a valid email")
  .max(255)
  .required("Email address is required");

// Yup validation schema for password
export const passwordValidationSchema = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  //.matches(/[A-Z]/, "Password must contain at least one uppercase letter")

  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[!@#\$%\^&\*]/,
    "Password must contain at least one special character"
  );

export const firstNameValidationSchema = Yup.string().required("This field  is required");

export const lastnameValidationSchema = Yup.string().required("This field  is required");

// Define Yup validation schema for password confirmation
export const passwordConfirmationSchema = Yup.string()
  .required("Confirm password is required")
  .oneOf([Yup.ref("password"), null], "Passwords must match");
