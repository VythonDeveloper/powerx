import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import IsNotAuthenticate from "../../redirect/IsNotAuthenticate";
import { signupSchema } from "../../validation/auth";
import { useFormik } from "formik";
import { dbObject } from "../../helper/constant";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/toaster/Toaster";
import "./auth.css";


const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);

  // Access the specific parameter you need
  const referCode = queryParams.get('refercode');

  const initialValues = {
    phone: '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
    referrerCode: referCode || '', // Set to referCode if available, otherwise empty string
  };


  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: async () => {
        try {
          const formData = new FormData();
          for (const key in values) {
            formData.append(key, values[key]);
          }
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type to form data
            },
          };

          console.log(formData)

          const { data } = await dbObject.post('/users/register.php', formData, config);
          console.log(data)
          if (!data.error) {
            toast.success(data.message, toastOptions)

            setTimeout(() => {
              navigate('/signin')
            }, 1000)
          } else { 
            toast.error(data.message, toastOptions) 
          }
        } catch (error) {
          console.log(error)
          toast.error('Internal server error', toastOptions) 
        }


      },
    });

  return (
    <IsNotAuthenticate>
      <div className="login-dark">
        <form onSubmit={handleSubmit} method="post" className="container">
          <h2 className="sr-only">Sign Up</h2>

          <div className="form-group mt-4">
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

          <div className="form-group mt-2 d-flex">
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

            <button type="button" className="btn btn-primary">OTP</button>
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

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              className="form-control"
              type="text"
              name="referrerCode"
              placeholder="Referal Code"
              value={values.referrerCode}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.referrerCode && touched.referrerCode ? (
              <small style={{ color: "red" }}>{errors.referrerCode}</small>
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
