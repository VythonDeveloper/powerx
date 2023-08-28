import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./forward.css";
import Header from "../../components/header/Header";
import { dbObject } from "../../helper/constant";
import Toaster, { toastOptions } from "../../components/toaster/Toaster";
import { toast } from "react-toastify";

const Forward = () => {
  const location = useLocation();
  const [contactList, setContactList] = useState([]);
  const [nickname, setnickname] = useState("");
  const [email, setemail] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [points, setPoints] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [forwardFees, setforwardFees] = useState('0')
  const [minForward, setminForward] = useState('0')

  const getContactList = async () => {
    try {
      const { data } = await dbObject("/contact-master/fetch.php");
      console.log(data);

      if (!data.error) {
        setContactList(data?.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getControlFields = async () => {
    try {
        const {data} = await dbObject.get('/power-x/control-fields.php')
        console.log(data)

        if(!data.error) {
            setforwardFees(data.response.forwardFees)
            setminForward(data?.response.minForward)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getContactList();
    getControlFields()
  }, []);

  const handleAddFrinedn = async () => {
    try {
      const values = {
        nickname,
        email,
      };

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await dbObject.post(
        "/contact-master/add-contact.php",
        formData,
        config
      );

      if (!data.error) {
        toast.success(data.message, toastOptions);
        getContactList();
        setShowAddFriend(false);
      } else {
        toast.error(data.message, toastOptions);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMoney = async () => {
    try {
      const values = {
        email: selectedEmail,
        points,
      };

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const {data} = await dbObject.post('/power-x/forward.php', formData, config)
      if(!data.error) {
        toast.success(data.message, toastOptions)
        setShowSendMoney(false)
        setPoints('')
      }else {
        toast.warning(data.message, toastOptions)
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {/* Top Navbar */}
      <Header title={"Forward"} path={location?.state?.from || "/"} />
      <Toaster />
      {showSendMoney && (
        <div className="add-friend">
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ width: "94%" }}
          >
            <div className="modal-content forward-modal p-3">
              <div className="modal-header border-bottom mb-3 pb-1">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Send Money
                </h1>
                <button
                  type="button"
                  className="modal-btn-close"
                  onClick={() => setShowSendMoney(false)}
                  style={{ color: "#fff" }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <p className="mb-2">Note: Minimum Forwaord INR. {minForward}</p>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Points
                    </label>
                    <input
                      type="number"
                      value={points}
                      className="form-control text-light"
                      id="exampleInputPassword1"
                      style={{ background: "#d3d3d33b", border: "none" }}
                      onChange={(e) => setPoints(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div>
                <p>Forward Fee {forwardFees}%</p>
              </div>
              <div className="modal-footer gap-3">
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowSendMoney(false)}
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  className="btn px-3 text-light"
                  style={{ background: "#fec007" }}
                  onClick={handleSendMoney}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {contactList?.length ? (
        <div>
          {contactList.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setShowSendMoney(true)
                setSelectedEmail(item.email);
              }}
              className="transaction-history-card py-0"
            >
              <div className="info">
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "3rem", color: "#b3b1b1" }}
                ></i>
                <div>
                  <p className="m-0">{item.nickname}</p>
                  <p className="m-0">{item.email}</p>
                </div>
              </div>

              {/* <div>
              <i
                className="bi bi-trash3-fill text-light"
                style={{ fontSize: "1.2rem" }}
              ></i>
            </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="bank-card">
          <div>
            <i className="bi bi-person-rolodex"></i>
          </div>
          <p>Add your first friend</p>
        </div>
      )}

      {/* Add */}
      {showAddFriend && (
        <div className="add-friend">
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ width: "94%" }}
          >
            <div className="modal-content forward-modal p-3">
              <div className="modal-header border-bottom mb-3 pb-1">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add Friend
                </h1>
                <button
                  type="button"
                  className="modal-btn-close"
                  onClick={() => setShowAddFriend(false)}
                  style={{ color: "#fff" }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div>
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      className="form-control text-light"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      style={{ background: "#d3d3d33b", border: "none" }}
                      onChange={(e) => setnickname(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      className="form-control text-light"
                      id="exampleInputPassword1"
                      style={{ background: "#d3d3d33b", border: "none" }}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer gap-3">
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowAddFriend(false)}
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  className="btn px-3 text-light"
                  style={{ background: "#fec007" }}
                  onClick={handleAddFrinedn}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="floating-btn d-flex align-items-center justify-content-center rounded-circle">
        <button
          type="button"
          className="w-100 h-100 d-flex justify-content-center align-items-center"
          onClick={() => setShowAddFriend(true)}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Forward;
