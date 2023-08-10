import React, { useState } from "react";
import Header from "../../components/header/Header";
import { useFormik } from "formik";
import { bankValidation } from "../../validation/auth";
import './bank.css'

const initialValues = {
  bank_name: "",
  account_number: "",
  ifsc_code: "",
  account_holder: "",
  upi: "",
};

const AddBank = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: bankValidation,
      onSubmit: async () => {},
    });

  return (
    <div className="container">
      {/* Top Navbar */}
      <Header title={"Add Bank"} path={"/bank"} />

      <div className="addbank-icon">
      <i className="bi bi-bank2" ></i>
       
      </div>

      <form onSubmit={handleSubmit}>
        <div className="up-input-outer">
          <label htmlFor="input1">Bank Name</label>
          <input
            id="input1"
            type="text"
            placeholder="Eg., State Bank of India"
            value={values.bank_name}
            name="bank_name"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.bank_name && touched.bank_name ? (
            <small style={{ color: "red" }}>{errors.bank_name}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input2">Account Number</label>
          <input
            id="input2"
            type="text"
            placeholder="Eg., 110283...."
            value={values.account_number}
            name="account_number"
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.account_number && touched.account_number ? (
            <small style={{ color: "red" }}>{errors.account_number}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input3">IFSC Code</label>
          <input
            id="input3"
            type="text"
            placeholder="Eg., SBIN008.."
            value={values.ifsc_code}
            name="ifsc_code"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.ifsc_code && touched.ifsc_code ? (
            <small style={{ color: "red" }}>{errors.ifsc_code}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input4">Account Holder Name</label>
          <input
            id="input4"
            type="text"
            placeholder="Eg., Your Name"
            value={values.account_holder}
            name="account_holder"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.account_holder && touched.account_holder ? (
            <small style={{ color: "red" }}>{errors.account_holder}</small>
          ) : null}
        </div>

        <div className="up-input-outer">
          <label htmlFor="input1">UPI Address</label>
          <input
            id="input1"
            type="text"
            placeholder="Eg., some@upi"
            value={values.upi}
            name="upi"
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.upi && touched.upi ? (
            <small style={{ color: "red" }}>{errors.upi}</small>
          ) : null}
        </div>
        <div style={{ width: "100%" }}>
          <button className="withdraw__btn" style={{ marginTop: "1.5rem", height: 55 }} type="submit">
            Add bank account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBank;
