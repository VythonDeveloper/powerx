import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IsNotAuthenticate from "../../redirect/IsNotAuthenticate";
import { signupSchema } from "../../validation/auth";
import { useFormik } from "formik";
import { dbObject } from "../../helper/constant";
import { toast } from "react-toastify";
import Toaster, { toastOptions } from "../../components/toaster/Toaster";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const location = useLocation()

  useEffect(() => {
    if(!location?.state?.referrerCode) {
      return navigate('/auth-refer')
    }
  }, [location])

  

  const initialValues = {
    phone: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
    email: "",
    referrerCode: location?.state?.referrerCode
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: async () => {
        // return console.log(values)
        try {
          const formData = new FormData();
        
          for (const key in values) {
            formData.append(key, values[key]);
          }
          const config = {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to form data
            },
          };

          console.log(formData);

          const { data } = await dbObject.post(
            "/users/register.php",
            formData,
            config
          );
          console.log(data);
          if (!data.error) {
            toast.success(data.message, toastOptions);

            setTimeout(() => {
              navigate("/signin");
            }, 1000);
          } else {
            toast.error(data.message, toastOptions);
          }
        } catch (error) {
          console.log(error);
          toast.error("Internal server error", toastOptions);
        }
      },
    });

    useEffect(() => {
      if (seconds > 0 && otpSent) {
        const interval = setInterval(() => {
          setSeconds(seconds - 1);
        }, 1000);
  
        return () => clearInterval(interval);
      }
  
      if (seconds <= 0) {
        setOtpSent(false);
      }
    }, [seconds, otpSent]);
  const handleOTP = async () => {
    try {
      if (!values.email) return toast.error("Email is required", toastOptions);
      const { data } = await dbObject.post(
        "https://otp.zingo.online/send-register-otp",
        { email: values.email }
      );

      if (!data.error) {
        toast.success(data.message, toastOptions);
        setSeconds(60);
        setOtpSent(true);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IsNotAuthenticate>
      <Toaster />
      <div className="login-dark">
        <form onSubmit={handleSubmit} method="post" className="container">
          <h2 className="sr-only text-center">Sign Up</h2>

          <div className="google-auth">
            <i className="bi bi-google"></i>

            <span>Sign up with Google</span>
          </div>

          <p className="mb-0 mt-4 text-center" style={{ color: "#95999d" }}>
            Or
          </p>

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              className="form-control"
              type="text"
              name="email"
              placeholder="Email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && touched.email ? (
              <small style={{ color: "red" }}>{errors.email}</small>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              className="form-control"
              type="number"
              name="phone"
              placeholder="Phone"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.phone && touched.phone ? (
              <small style={{ color: "red" }}>{errors.phone}</small>
            ) : null}
          </div>
          {otpSent && seconds > 0 ? (
            <div className="mt-2" style={{fontSize: 12, marginBottom:-12, paddingLeft: 13}}>
              Resend otp in <span>{seconds}</span> s
            </div>
          ) : null}
          <div className="form-group d-flex">
            <input
              autoComplete="off"
              className="form-control"
              type="text"
              name="otp"
              placeholder="OTP"
              value={values.otp}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <button
              onClick={handleOTP}
              type="button"
              className="btn btn-primary"
              disabled={otpSent}
            >
              OTP
            </button>
          </div>
          {errors.otp && touched.otp ? (
            <small style={{ color: "red" }}>{errors.otp}</small>
          ) : null}

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              className="form-control"
              type="password"
              name="newPassword"
              placeholder="Create Password"
              value={values.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.newPassword && touched.newPassword ? (
              <small style={{ color: "red" }}>{errors.newPassword}</small>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <small style={{ color: "red" }}>{errors.confirmPassword}</small>
            ) : null}
          </div>

          <div className="form-group mt-4">
            <button className="btn btn-primary btn-block" type="submit">
              Sign Up
            </button>
          </div>

          <Link to={"/signin"} className="signIn_SignUp">
            Already have an account? <span>Sign In</span>
          </Link>
        </form>
      </div>
    </IsNotAuthenticate>
  );
};

export default Signup;
