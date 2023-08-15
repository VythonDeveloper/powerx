import React from "react";
import "./result-popup.css";

const ResultPopup = ({setShowResult}) => {
  return (
    <div className="result-popup">
      <div className="result-popup-close"></div>

      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="result-popup-content">
          <div className="result-popup-heading">
            <img className="coin" src="/images/coin.png" alt="coin" />
            <img className="crown" src="/images/crown2.png" alt="crown" />
            <h2>Win</h2>
          </div>

          <div className="rank">
            <p className="mb-0">3</p>
          </div>

          <div className="result-popup-text">
            <div className="d-flex justify-content-between">
              <p className="mb-0">Period</p>
              <p className="mb-0">202351891</p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="mb-0">Price</p>
              <p className="mb-0">5000</p>
            </div>

            <div className="mt-4 result-popup-text-box">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="mb-0">Selected</p>

                <div className="btn btn-success">
                  Green
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="mb-0">Point</p>
                <p className="mb-0">50</p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Amount</p>
                <h2 className="mb-0 text-success">+₹96</h2>
              </div>
            </div>

            <button onClick={() => setShowResult(false)} className="w-100 mt-4 btn btn-primary" style={{padding: '0.8rem'}}>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
