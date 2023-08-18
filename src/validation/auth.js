import * as Yup from "yup";

export const signinSchema = Yup.object({
  phone: Yup.number().required("Please enter your phone number!"),
  password: Yup.string().required("Please enter your password!"),
});

export const signupSchema = Yup.object({
    phone: Yup.number().required("Please enter your phone number!"),
    otp: Yup.number().required("Please enter your OTP!"),
    newPassword: Yup.string().required("Please enter your password!"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
    .required("Password and Confirm password should matched!"),
    referrerCode: Yup.string().required("Please enter your referal code!"),
})

export const forgotPassSchema = Yup.object({
    phone: Yup.number().required("Please enter your phone number!"),
    otp: Yup.number().required("Please enter your OTP!"),
    newPassword: Yup.string().required("Please enter your password!"),
})

export const bankValidation = Yup.object({
  bankName: Yup.string().required("Please enter your phone number!"),
  accountNumber: Yup.string()
    .required("Please enter your account number!")
    .matches(/^[0-9]{10}$/, "Invalid bank number"),
    ifscCode: Yup.string()
    .required("Please enter IFSC code!")
    .matches(/^([A-Za-z]{4}\d{7})$/, "Invalid IFSC code"),
  accountHolder: Yup.string()
    .required("Please enter your name!")
    .matches(/^[A-Za-z\s]+$/, "Invalid account holder name")
    .min(2, "Account holder name should be at least 2 characters long")
    .max(50, "Account holder name should not exceed 50 characters"),
  upiAddress: Yup.string()
    .required("Please enter your upi address!")
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid upi address"),
});
