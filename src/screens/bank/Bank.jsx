import React, { useState } from "react";
import "./bank.css";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/header/Header'

const Bank = () => {
  const location = useLocation();
  const [banks, setBanks] = useState(true);
  const navigate = useNavigate()

  return (
    <div className="container">
      {/* Top Navbar */}
      <Header title={"Bank"} path={location?.state?.from || "/"} />

      {banks ? (
        <div className="all-bank">
          <BankCard navigate={navigate} setBanks={setBanks} />
        </div>
      ) : (
        <div onClick={() => navigate('/add-bank')} className="bank-card">
          <i className="bi bi-bank2" style={{ fontSize: '3rem' }}></i>
          <p>Tab to add first account</p>
        </div>
      )}

      <div className="floating-btn d-flex align-items-center justify-content-center rounded-circle">
        <button
          type="button"
          className="w-100 h-100 d-flex justify-content-center align-items-center"
          onClick={() => navigate('/add-bank')}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>

    </div>
  );
};


const BankCard = ({ setBanks, navigate }) => (
  <div className="bank-detail-card">
    <div className="bank-detail-card-header">
      <h3 className="m-0">Punjab National Bank</h3>
      <button onClick={() => setBanks(false)}>
        <i className="bi bi-trash3"></i>
      </button>
    </div>

    <div className='bank-detail-card-info mt-4'>
      <div>
        <p className="m-0">A/C Number</p>
        <p className="m-0">00000000000</p>
      </div>

      <div>
        <p className="m-0">IFSC</p>
        <p className="m-0">UTBI0007</p>
      </div>
    </div>

    <div className='bank-detail-card-info'>
      <div>
        <p className="m-0">Holder Name</p>
        <p className="m-0">Ashadu Zaman</p>
      </div>

      <div>
        <p className="m-0">UPI Address</p>
        <p className="m-0">exaple@ybl</p>
      </div>
    </div>


  </div>
);

export default Bank;
