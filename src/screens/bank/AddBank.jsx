import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useFormik } from "formik";
import { bankValidation } from "../../validation/auth";
import "./bank.css";
import { dbObject } from "../../helper/constant";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/toaster/Toaster";

let initialValues = {
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountHolder: "",
  upiAddress: "",
};

const AddBank = () => {
  const [bank, setBank] = useState({})
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: bankValidation,
      onSubmit: async () => {
        try {
          const formData = new FormData();
          for (const key in values) {
            formData.append(key, values[key]);
          }
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };

          const { data } = await dbObject.post("/bank-account/update.php", formData, config);
          if(!data.error) {
            toast.success(data.message, toastOptions)
            
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  const getBank = async () => {
    try {
      const { data } = await dbObject.get("/bank-account/fetch.php");

      console.log(data)
      initialValues = {
        ...data.response
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBank();
  }, []);

  return (
    <div className="container">
      {/* Top Navbar */}
      <Header title={"Add Bank"} path={"/bank"} />

      <div className="addbank-icon">
        <i className="bi bi-bank2"></i>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="up-input-outer">
          <label htmlFor="input1">Bank Name</label>
          <input
            id="input1"
            type="text"
            placeholder="Eg., State Bank of India"
            value={values.bankName}
            name="bankName"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.bankName && touched.bankName ? (
            <small style={{ color: "red" }}>{errors.bankName}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input2">Account Number</label>
          <input
            id="input2"
            type="text"
            placeholder="Eg., 110283...."
            value={values.accountNumber}
            name="accountNumber"
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.accountNumber && touched.accountNumber ? (
            <small style={{ color: "red" }}>{errors.accountNumber}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input3">IFSC Code</label>
          <input
            id="input3"
            type="text"
            placeholder="Eg., SBIN008.."
            value={values.ifscCode}
            name="ifscCode"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.ifscCode && touched.ifscCode ? (
            <small style={{ color: "red" }}>{errors.ifscCode}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input4">Account Holder Name</label>
          <input
            id="input4"
            type="text"
            placeholder="Eg., Your Name"
            value={values.accountHolder}
            name="accountHolder"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.accountHolder && touched.accountHolder ? (
            <small style={{ color: "red" }}>{errors.accountHolder}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input1">upiAddress Address</label>
          <input
            id="input1"
            type="text"
            placeholder="Eg., some@upiAddress"
            value={values.upiAddress}
            name="upiAddress"
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.upiAddress && touched.upiAddress ? (
            <small style={{ color: "red" }}>{errors.upiAddress}</small>
          ) : null}
        </div>
        <div style={{ width: "100%" }}>
          <button
            className="withdraw__btn"
            style={{ marginTop: "1.5rem", height: 55 }}
            type="submit"
          >
            Add bank account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBank;
