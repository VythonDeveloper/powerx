import React, { useContext, useEffect, useState } from "react";
import "./game.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import IsAuthenticate from "../../redirect/IsAuthenticate";
import { database } from "../../firebase.config";
import { onValue, ref, set } from "firebase/database";
import { dbObject } from "../../helper/constant";
import Keyboard from "../../components/keyboard/Keyboard";
import { Rupee } from "../../assets/svg/CustomSVG";
import { toast } from "react-toastify";
import Toaster, { toastOptions } from "../../components/toaster/Toaster";
import ResultPopup from "../../components/result-popup/ResultPopup";

const FastParity = () => {
  const navigate = useNavigate();
  const firstCardList = ["A", "B", "C", "D"];
  const [activeBtn2, setActiveBtn2] = useState("OtherPlayers");
  const [timer, setTimer] = useState("0:00");
  const [period, setPeroid] = useState("000000000000");
  const [winWallet, setWinWallet] = useState("0.00");
  const [playWallet, setPlayWallet] = useState("0.00");
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState();
  const [color, setColor] = useState();
  const [alphabet, setAlphabet] = useState();
  const [showModal, setShowModal] = useState(false);
  const [timeinSec, setTimeinSec] = useState(0);
  const [myOrder, setMyOrder] = useState([]);
  const [resultHistory, setResultHistory] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const location = useLocation();

  function secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const powerxRef = ref(database, "power-x/timer");

    try {
      onValue(powerxRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0];
          const { time, period } = data[key];
          setPeroid(period);
          setTimer(secondsToTime(time));
          setTimeinSec(time);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getWallet = async () => {
    try {
      const { data } = await dbObject("/power-x/fetch-wallet.php");
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
    getMyOrder();
    getResultHistory();
  }, []);

  const placeBit = async () => {
    if (timeinSec > 10) {
      try {
        const values = {
          period,
          coin,
          color,
          alphabet,
          points: amount,
        };

        if (!amount)
          return toast.error("Minimum 1 Rupee is required", toastOptions);

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
          "/power-x/place-bid.php",
          formData,
          config
        );
        console.log(data);
        if (!data.error) {
          toast.success(data.message, toastOptions);
          setAmount("");
          getWallet();
          getMyOrder();
          setShowModal(false);
        } else {
          toast.warning(data.message, toastOptions);
          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("You can place bit after in next period");
    }
  };

  const getMyOrder = async () => {
    try {
      const { data } = await dbObject.get("/power-x/my-orders.php");
      console.log(data);

      if (!data.error) {
        setMyOrder(data.response.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getResultHistory = async () => {
    try {
      const { data } = await dbObject.get("/power-x/result-history.php");
      console.log(data);

      if (!data.error) {
        setResultHistory(data.response.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IsAuthenticate path="/power-x">
      <div className="container">
        <Header title={"Power X"} />
        <Toaster />

        {
          showResult && (
            <ResultPopup setShowResult={setShowResult} />
          )
        }

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
              {coin ? "Coin - " : alphabet ? "Alphabet - " : "Color - "}{" "}
              {coin || alphabet || color}
            </h2>

            <div className="contract-point">
              <p>Contract Amount</p>

              <div
                className="withdrawal__input__field justify-content-start px-3"
                style={{ backgroundColor: "#e5e5e5" }}
              >
                <div className="withdrawal__input__field__icon justify-content-start text-dark ">
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
              <p className="mb-0 mt-2">Service charge 10%</p>
              <p className="mb-0 mt-2">Delivery 50.00</p>
            </div>

            <Keyboard amount={amount} setAmount={setAmount} />

            <div className="mb-3 d-flex justify-content-center">
              <button
                style={{
                  backgroundColor: "rgb(252, 148, 13)",
                }}
                onClick={placeBit}
                className="btn text-light py-3 modal-btn w-25"
              >
                Start
              </button>
            </div>
          </div>
        )}

        <div>
          {/* Wallet */}
          <div className="wallet-container d-flex justify-content-between align-items-center gap-2 my-2">
            <div className="parity-top flex-column align-items-center w-100 p-2 ">
              <p className="mb-1">Win Wallet</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                ₹{winWallet}
              </p>

              <button
                className="btn text-white rounded-pill w-100 fw-medium"
                style={{
                  backgroundColor: "#fc940d",
                  fontSize: 13,
                }}
                onClick={() =>
                  navigate("/withdraw", { state: { from: location.pathname } })
                }
              >
                Withdraw
              </button>

              <button
                className="btn text-white rounded-pill w-100 fw-medium mt-2"
                style={{
                  backgroundColor: "#00c282",
                  fontSize: 13,
                }}
                onClick={() =>
                  navigate("/transfer", { state: { from: location.pathname } })
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
                  backgroundColor: "#fc940d",
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
                  backgroundColor: "#00c282",
                  fontSize: 13,
                }}
                onClick={() =>
                  navigate("/power-x/forward", {
                    state: { from: location.pathname },
                  })
                }
              >
                Forward
              </button>
            </div>
          </div>

          <div className="parity-top mt-2 px-4 py-2">
            <div className="parity-period">
              <p>5 Minute</p>
              <p>{period}</p>
            </div>

            <div className="parity-count">
              <p className="m-0 mt-1">Count Down</p>
              <div className="parity-count-box p-2 ">
                <p className="m-0">{timer}</p>
              </div>
            </div>
          </div>

          <div className="power-x p-2 mt-2 position-relative">
            <div className="game-coins position-relative">
              <div
                className="d-flex flex-column gold-coin"
                onClick={() => {
                  setCoin("Gold");
                  setColor("");
                  setAlphabet("");
                  setShowModal(true);
                }}
              >
                <p className="mb-0 pt-3 text-center">GOLD</p>
                <p className="border-top w-75 text-center mx-auto">2X</p>
              </div>

              <div
                className="d-flex flex-column justify-content-center align-items-center silver-coin"
                onClick={() => {
                  setCoin("Silver");
                  setColor("");
                  setAlphabet("");
                  setShowModal(true);
                }}
              >
                <p className="mb-0 pt-3 text-center">SILVER</p>

                <p className="border-top  w-75 text-center mx-auto">2X</p>
              </div>
            </div>

            <div className="prity-colors position-relative">
              <div
                // data-bs-toggle="modal"
                // data-bs-target="#exampleModal"
                className="p-3"
                style={{ backgroundColor: "#d72e2a" }}
                onClick={() => {
                  setCoin("");
                  setColor("Red");
                  setAlphabet("");
                  setShowModal(true);
                }}
              >
                <p className="m-0">Red</p>
                <p className="m-0 border-top w-75 text-center">2X</p>
              </div>

              <div
                // data-bs-toggle="modal"
                // data-bs-target="#exampleModal"
                style={{ backgroundColor: "#388e3d" }}
                onClick={() => {
                  setCoin("");
                  setColor("Green");
                  setAlphabet("");
                  setShowModal(true);
                }}
              >
                <p className="m-0">green</p>
                <p className="m-0 border-top w-75 text-center">3X</p>
              </div>

              <div
                // data-bs-toggle="modal"
                // data-bs-target="#exampleModal"
                style={{ backgroundColor: "#1976d3" }}
                onClick={() => {
                  setCoin("");
                  setColor("Blue");
                  setAlphabet("");
                  setShowModal(true);
                }}
              >
                <p className="m-0">Blue</p>
                <p className="m-0 border-top w-75 text-center">4X</p>
              </div>
            </div>

            <div className="paritynum-btns position-relative">
              {firstCardList.map((item, i) => (
                <div
                  onClick={() => {
                    setCoin("");
                    setColor("");
                    setAlphabet(item);
                    setShowModal(true);
                  }}
                  className="border rounded"
                  key={i}
                >
                  <p className="m-0">{item}</p>
                  <p className="m-0 border-top w-50 text-center">{2 + i}X</p>
                </div>
              ))}
            </div>

            <div className="single-entry">
              <p className="mb-0">Single</p>
              <p className="mb-0">Entry</p>
              <p className="mb-0">Option</p>
            </div>
          </div>

          <div className="gameDetails-btn-group mt-3">
            <button
              onClick={() => setActiveBtn2("OtherPlayers")}
              className={`${
                activeBtn2 === "OtherPlayers" ? "gameDetails-activeBtn" : ""
              }`}
            >
              Result History
            </button>

            <button
              onClick={() => setActiveBtn2("MyOrder")}
              className={`${
                activeBtn2 === "MyOrder" ? "gameDetails-activeBtn" : ""
              }`}
            >
              My Orders
            </button>
          </div>

          {activeBtn2 === "OtherPlayers" ? (
            <div>
              <table style={{ width: "100%", marginTop: "1rem" }}>
                <thead>
                  <tr className="parity-myorder-header parity-myorder row">
                    <td className="col-5">Period</td>
                    <td className="col-2 text-center">Coin</td>
                    <td className="col-2 text-center">Color</td>
                    <td className="col-2">Alphabet</td>
                  </tr>
                </thead>

                <tbody>
                  {resultHistory.map((item, i) => (
                    <tr key={i} className="parity-myorder row">
                      <td className="col-5">{item.period}</td>
                      <td className="parity-selected col-2">
                        <p>{item.coin ? item.coin : "-"}</p>
                      </td>
                      <td className="col-2 text-center">
                        {item.color ? item.color : "-"}
                      </td>
                      <td className="col-2">
                        {item.alphabet ? item.alphabet : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <table style={{ width: "100%", marginTop: "1rem" }}>
                <thead>
                  <tr className="parity-myorder-header parity-myorder row">
                    <td className="col-4">Period</td>
                    <td className="col-4 text-center">Select</td>
                    <td className="col-4">Point</td>
                  </tr>
                </thead>

                <tbody>
                  {myOrder.map((item, i) => (
                    <tr key={i} className="parity-myorder row">
                      <td className="col-4">{item.period}</td>
                      <td className="parity-selected col-4 text-light">
                        <p>{item.alphabet || item.coin || item.color}</p>
                      </td>
                      <td className="col-4">₹{item.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </IsAuthenticate>
  );
};

export default FastParity;
