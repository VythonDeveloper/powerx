import React, { useEffect, useState } from "react";
import "./game.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { database } from "../../firebase.config";
import { onValue, ref, set } from "firebase/database";
import { dbObject } from "../../helper/constant";
import { Rupee } from "../../assets/svg/CustomSVG";
import Keyboard from "../../components/keyboard/Keyboard";
import ResultPopup from "../../components/result-popup/ResultPopup";

const Parity = () => {
  const navigate = useNavigate();
  const firstCardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [timer, setTimer] = useState("0:00");
  const [period, setPeroid] = useState("000000000000");
  const [winWallet, setWinWallet] = useState("0.00");
  const [playWallet, setPlayWallet] = useState("0.00");
  const [amount, setAmount] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [nums, setNums] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedNum, setSelectedNum] = useState(null);
  const [selectedNum2, setSelectedNum2] = useState(null);
  const [result, setResult] = useState([]);

  const location = useLocation();

  function secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const dusKaDamRef = ref(database, "dus-ka-dum/timer");

    try {
      onValue(dusKaDamRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0];
          const { time, period } = data[key];
          setPeroid(period);
          setTimer(secondsToTime(time));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getWallet = async () => {
    try {
      const { data } = await dbObject("/dus-ka-dum/fetch-wallet.php");
      console.log(data);

      if (!data.error) {
        setWinWallet(data?.response.winWallet);
        setPlayWallet(data?.response.playWallet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWallet();
    getResultHistory();
  }, []);

  const [showMyBid, setShowMyBid] = useState(false);

  const getResultHistory = async () => {
    try {
      const { data } = await dbObject.get("/dus-ka-dum/result-history.php");
      console.log(data);

      if (!data.error) {
        const sortedData = data.response.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setResult(sortedData.slice(0, 5));

        console.log(sortedData.slice(0, 5));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    setNums({ ...nums, [selectedNum]: amount });
    setShowModal(false);
    setAmount("");
  };

  const placeBit = async () => {
    try {
      const values = {
        ...nums,
        period,
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

      console.log(values);
      const { data } = await dbObject.post(
        "/dus-ka-dum/place-bid.php",
        formData,
        config
      );

      console.log(data);
      setNums({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#000" }}>
      <div className="container dus-ka-dum">
        <Header backgroundColor={"#fff"} title={"10 Ka Dum"} />

        {showResult && <ResultPopup setShowResult={setShowResult} />}

        {showModal && (
          <div className="start-box">
            <div className="modal-header p-2 mb-3 border-bottom">
              <button
                onClick={() => setShowModal(false)}
                className="ms-auto close-btn"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <h2 className="game-name">
              Selected - {selectedNum2}
            </h2>

            <div className="contract-point">
              <p>Contract Amount</p>

              <div
                className="withdrawal__input__field justify-content-start px-3"
                style={{ backgroundColor: "#e5e5e5" }}
              >
                <div className="withdrawal__input__field__icon justify-content-start text-dark">
                  <Rupee />
                </div>

                <div
                  className="input pe-3"
                  style={{ fontWeight: "700", fontSize: "1.5rem" }}
                >
                  {amount}
                </div>
              </div>
            </div>

            <div className="withdrawal__input__notes d-flex justify-content-between">
              <p className="mb-0 mt-2 text-light">Service charge 10%</p>
              <p className="mb-0 mt-2 text-light">Delivery 50.00</p>
            </div>

            <Keyboard amount={amount} setAmount={setAmount} />

            <div className="mb-3 d-flex justify-content-center">
              <button
                style={{
                  backgroundColor: "rgb(252, 148, 13)",
                }}
                onClick={handleChange}
                className="btn text-light py-3 modal-btn w-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        <div>
          {/* Wallet */}
          <div className="wallet-container d-flex justify-content-between align-items-center gap-2 mt-2">
            <div className="parity-top flex-column align-items-center w-100 p-2 ">
              <p className="mb-1">Win Wallet</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                ₹{winWallet}
              </p>

              <button
                className="btn text-white rounded-pill w-100 fw-medium"
                style={{
                  backgroundColor: "#65c65f",
                  fontSize: 13,
                }}
                onClick={() =>
                  navigate("/dus-ka-dum/withdraw", {
                    state: { from: location.pathname },
                  })
                }
              >
                Withdraw
              </button>

              <button
                className="btn text-white rounded-pill w-100 fw-medium mt-2"
                style={{
                  backgroundColor: "#25263b",
                  fontSize: 13,
                }}
                onClick={() =>
                  navigate("/dus-ka-dum/transfer", {
                    state: { from: location.pathname },
                  })
                }
              >
                Transfer
              </button>
            </div>

            <div className="parity-top flex-column align-items-center w-100 p-2">
              <p className="mb-1">Play Wallet</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                ₹{playWallet}
              </p>

              <button
                className="btn text-white rounded-pill w-100 fw-medium"
                style={{
                  backgroundColor: "#65c65f",
                  fontSize: 13,
                }}
                onClick={() =>
                  navigate("/recharge", { state: { from: location.pathname } })
                }
              >
                Recharge
              </button>

              <button
                className="btn text-white rounded-pill w-100 fw-medium mt-2"
                style={{
                  backgroundColor: "#25263b",
                  fontSize: 13,
                }}
                onClick={() =>
                  navigate("/dus-ka-dum/forward", {
                    state: { from: location.pathname },
                  })
                }
              >
                Forward
              </button>
            </div>
          </div>

          {/* Timer */}
          <div className="timer dkd  my-2 position-relative">
            <div>
              <div className="parity-period  rounded d-flex flex-column align-items-center justify-content-center p-1">
                <p
                  className="mb-0 pb-0 px-3"
                  style={{
                    backgroundColor: "#fff",
                    fontWeight: "900",
                    color: "#002060",
                    fontSize: '14px'
                  }}
                >
                  5 Minute
                </p>
                <p className="mb-0" style={{fontSize: 14}}>{period}</p>
              </div>
              <p
                className="mb-1 mt-1 w-25 d-flex justify-content-center text-light"
                style={{
                  backgroundColor: "#098285",
                  position: "absolute",
                  bottom: "-12.5px",
                  borderRadius: 5,
                }}
              >
                Result...
              </p>
            </div>

            <div className="parity-count rounded p-1 ">
              <p
                className="m-0"
                style={{ fontWeight: "800", color: "#002060" }}
              >
                Time Left
              </p>
              <div className="parity-count-box p-1 ">
                <p
                  className="m-0"
                  style={{ backgroundColor: "#fff", color: "#000" }}
                >
                  {timer}
                </p>
              </div>
            </div>
          </div>

          <div className="slider mt-2">
            {result.map((item, i) => {
              const dateObject = new Date(item.date);
              const formattedTime = dateObject.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              return (
                <div
                  key={i}
                  className="slide-item d-flex flex-column align-item-center"
                >
                  <div>{item.number || "?"}</div>
                  <p className="mb-0 text-danger text-center" style={{ fontSize: "10px" }}>
                    {/* {item.time} */}
                    {formattedTime}
                  </p>
                </div>
              );
            })}

            <div
              onClick={() =>
                navigate("/dus-ka-dum/result", {
                  state: { from: '/dus-ka-dum/result' },
                })
              }
              className="slider-btn ms-auto"
            >
              <i className="bi bi-arrow-right-square-fill"></i>
            </div>
          </div>

          <div className="paritynum-btns mt-2 p-4">
            {firstCardList.map((item, i) => (
              <div
                className="position-relative item mb-2 dkd-chip"
                onClick={() => {
                  setShowModal(true);
                  setSelectedNum(`num${i + 1}`);
                  setSelectedNum2(i+1)
                }}
                key={i}
              >
                <p className="m-0 text-light">{item}</p>
                {nums[`num${i + 1}`] > 0 ? (
                  <span className="dus-ka-dum-flag text-light">
                    <span
                      className="w-100 h-75 mt-2 text-center bg-war"
                      style={{ backgroundColor: "#A084E8" }}
                    >
                      {nums[`num${i + 1}`]}
                    </span>
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button onClick={placeBit} className="enter-btn">
              Enter
            </button>
          </div>

          <div className="dkd-table">
          <div className="header mt-4 p-2">
            <p className="mb-0">Entry no.</p>
            <p className="text-center mb-0">ID</p>
            <p className="text-center mb-0">Total</p>
            <p className="text-center mb-0">Result</p>
            <p className="text-end mb-0">Won </p>
          </div>

            <div className="value  p-2">
              <p className="mb-0" onClick={() => setShowMyBid(!showMyBid)}>1  {showMyBid ? (
                      <i className="bi bi-arrow-down-circle"></i>
                    ) : (
                      <i className="bi bi-arrow-up-circle"></i>
                    )}</p>
              <p className="text-center mb-0">12/5/2024 12:50pm</p>
              <div className="text-center mb-0" >₹20</div>
              <div className="text-center mb-0" >5</div>
              <p
                className={`text-end mb-0`}
                style={{ fontSize: "18px", fontWeight: "500" }}
              >
                ₹200
              </p>
            </div>

            {showMyBid && (
            <div className="my-bit mt-2">
              {firstCardList.map((item, i) => (
                <div
                  key={i}
                  className={`d-flex flex-column gap-1 text-center`}
                >
                  <p
                    className="mb-0 text-light d-flex justify-content-center align-items-center rounded-pill fw-blod fw-bold bg-danger"
                    style={{ width: 30, height: 30 }}
                  >
                    {item}
                  </p>
                  <p className="mb-0">2</p>
                </div>
              ))}
            </div>
          )}
       
        </div>
        </div>
      </div>
    </div>
  );
};

export default Parity;
