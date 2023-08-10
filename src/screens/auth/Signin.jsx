import React, { useContext } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signinSchema } from "../../validation/auth";
import { AppContext } from "../../context/AppContext";
import { dbObject } from "../../helper/constant";
import IsNotAuthenticate from "../../redirect/IsNotAuthenticate";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/toaster/Toaster";

const initialValues = {
  phone: "",
  password: "",
};
const Signin = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signinSchema,
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

          const { data } = await dbObject.post('/users/login.php', formData, config);
          if (!data.error) {
            toast.success(data.message, toastOptions)

            setTimeout(() => {
              setUser(data.response)
              // navigate('/')
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
          <h2 className="sr-only">Sign In</h2>

          <div className="form-group mt-4">
            <input
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className="form-control"
              type="number"
              name="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone ? (
              <small style={{ color: "red" }}>{errors.phone}</small>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <small style={{ color: "red" }}>{errors.password}</small>
            ) : null}
          </div>
          <div className="form-group mt-4">
            <button className="btn btn-primary btn-block" type="submit">
              Sign In
            </button>
          </div>
          <Link to="/forgot-password" className="forgot">
            Forgot your password?
          </Link>

          <Link to={"/signup"} className="signIn_SignUp">
            Don't have an account? <span>Sign Up</span>
          </Link>
        </form>
      </div>
    </IsNotAuthenticate>
  );
};

export default Signin;
