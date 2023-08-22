import React from "react";
import { Header } from "../../components";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
    const location = useLocation()
  return (
    <div className="container">
      <Header title={"Contact Us"} path={location?.state?.from || "/profile"} />
<form action="" className="contact-form mt-5">
    
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="8025510456" />
</div>

<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
</div>

<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>

<div className="d-flex justify-content-center">
    <button className="btn btn-warning w-100">Submit</button>
</div>
</form>
    </div>
  );
};

export default ContactUs;
