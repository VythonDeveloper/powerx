import * as Yup from "yup";

export const signinSchema = Yup.object({
  phone: Yup.number().required("Please enter your phone number!"),
  password: Yup.string().required("Please enter your password!"),
});

export const signupSchema = Yup.object({
    phone: Yup.number().required("Please enter your phone number!"),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    otp: Yup.number().required("Please enter your OTP!"),
    newPassword: Yup.string().required("Please enter your password!"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
    .required("Password and Confirm password should matched!"),
})

export const referSchema = Yup.object({
  referrerCode: Yup.string().required("Please enter your referal code!"),
})

export const forgotPassSchema = Yup.object({
    phone: Yup.number().required("Please enter your phone number!"),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    otp: Yup.number().required("Please enter your OTP!"),
    newPassword: Yup.string().required("Please enter your password!"),
})

