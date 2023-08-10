import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./forward.css";
import Header from '../../components/header/Header'

const Forward = () => {
  const location = useLocation();
  return (
    <div className="container">
      {/* Top Navbar */}
      <Header title={'Forward'} path={location?.state?.from || "/"} />
      

      <div>
        <div className="transaction-history-card py-0">
          <div className="info">
            <i className="bi bi-person-circle" style={{ fontSize: "3rem", color: '#b3b1b1' }}></i>
            <div>
              <p className="m-0">Ashadu Zaman</p>
              <p className="m-0">8023030340</p>
            </div>
          </div>

          <div>
          <i className="bi bi-trash3-fill text-light" style={{fontSize: '1.2rem'}}></i>
          </div>
        </div>

        <div className="transaction-history-card py-0">
          <div className="info">
            <i className="bi bi-person-circle" style={{ fontSize: "3rem", color: '#b3b1b1' }}></i>
            <div>
              <p className="m-0">Ashadu Zaman</p>
              <p className="m-0">8023030340</p>
            </div>
          </div>

          <div>
          <i className="bi bi-trash3-fill text-light" style={{fontSize: '1.2rem'}}></i>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content forward-modal">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Friend
              </h1>
              <button
                type="button"
                className="modal-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ color: "#fff" }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <label for="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control text-light"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    style={{ background: "#d3d3d33b", border: "none" }}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control text-light"
                    id="exampleInputPassword1"
                    style={{ background: "#d3d3d33b", border: "none" }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer gap-3">
              <button type="button" className="close-btn" data-bs-dismiss="modal">
                CLOSE
              </button>
              <button
                type="button"
                className="btn px-3 text-light"
                style={{ background: "#fec007" }}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-btn d-flex align-items-center justify-content-center rounded-circle">
        <button
          type="button"
          className="w-100 h-100 d-flex justify-content-center align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Forward;
