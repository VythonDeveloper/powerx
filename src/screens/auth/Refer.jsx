import React from 'react'
import "./auth.css";
import IsNotAuthenticate from "../../redirect/IsNotAuthenticate";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import IsNotAuthenticate from "../../redirect/IsNotAuthenticate";
import { signupSchema } from "../../validation/auth";
import { useFormik } from "formik";
import { dbObject } from "../../helper/constant";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/toaster/Toaster";

const Refer = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
  
    // Access the specific parameter you need
    const referCode = queryParams.get('refercode');
  
    const initialValues = {
      referrerCode: referCode || '', // Set to referCode if available, otherwise empty string
    };
  
  
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues: initialValues,
        validationSchema: signupSchema,
        onSubmit: async () => {
        //   try {
        //     const formData = new FormData();
        //     for (const key in values) {
        //       formData.append(key, values[key]);
        //     }
        //     const config = {
        //       headers: {
        //         'Content-Type': 'multipart/form-data', // Set the content type to form data
        //       },
        //     };
  
        //     console.log(formData)
  
        //     const { data } = await dbObject.post('/users/register.php', formData, config);
        //     console.log(data)
        //     if (!data.error) {
        //       toast.success(data.message, toastOptions)
  
        //       setTimeout(() => {
        //         navigate('/signin')
        //       }, 1000)
        //     } else { 
        //       toast.error(data.message, toastOptions) 
        //     }
        //   } catch (error) {
        //     console.log(error)
        //     toast.error('Internal server error', toastOptions) 
        //   }
  
  
        },
      });
  return (
    <IsNotAuthenticate>
    <div className="login-dark">
      <form onSubmit={handleSubmit} method="post" className="container">
        <h2 className="sr-only">Refer Code</h2>


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
            Verify
          </button>
        </div>

      </form>
    </div>
  </IsNotAuthenticate>
  )
}

export default Refer