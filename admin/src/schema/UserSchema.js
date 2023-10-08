import * as yup from "yup";

const UserSchema = yup.object().shape({
  name: yup.string().min(2).required("Username is required"),
  password: yup
    .string()
    .min(6)
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Password is required"),
});

export default UserSchema;
