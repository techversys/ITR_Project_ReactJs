import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  username: Yup.string().min(3).max(25).required("fullname is required"),
  email: Yup.string().email().required("email is required").matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    "Email Pattern Wont Match"
    ),
  phoneno: Yup
  .number("Must be number")
  .required("Phone Number Is required")
  .positive()
  .integer(),
  gender:Yup.string().required('select the required gender'),
  address:Yup.string().required('enter the correct address'),
  dob:Yup.string().min(4).required("date of birth is required"),
  profile:Yup.string().required("mention your profile type"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  // img_array:Yup.array(),
  // file: Yup
  //     .mixed()
  //     .nullable()
  //     .required()
  //     .test(
  //       "FILE_SIZE",
  //       "Uploaded file is too big",
  //       (value)=>!value || (value && value.size <= 1024 * 1024)
  //     )

  //     .test(
  //       "FILE_FORMAT",
  //       "Uploaded file has unsupported format.",
  //       (value)=> !value|| (value && SUPPORTED_FORMATS.includes(value?.type))
  //     )
});
