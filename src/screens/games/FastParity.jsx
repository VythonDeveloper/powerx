import React, { useContext, useEffect, useState } from "react";
import "./game.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import IsAuthenticate from "../../redirect/IsAuthenticate";
import { database } from '../../firebase.config'
import { onValue, ref, set } from 'firebase/database';
import { dbObject } from "../../helper/constant";
import Keyboard from "../../components/keyboard/Keyboard";
import { Rupee } from "../../assets/svg/CustomSVG";

const FastParity = () => {
  const navigate = useNavigate();
  const firstCardList = ["A", "B", "C", "D"];
  const [activeBtn, setActiveBtn] = useState("probability");
  const [activeBtn2, setActiveBtn2] = useState("OtherPlayers");
  const probabilityBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [timer, setTimer] = useState('0:00');
  const [period, setPeroid] = useState('000000000000')
  const [winWallet, setWinWallet] = useState('0.00')
  const [playWallet, setPlayWallet] = useState('0.00')
  const [amount, setAmount] = useState('1')
  const [coin, setCoin] = useState()
  const [color, setColor] = useState()
  const [alphabet, setAlphabet] = useState()

  const location = useLocation();

  function secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const powerxRef = ref(database, 'power-x/timer');

    try {
      onValue(powerxRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0];
          const { time, period } = data[key];
          setPeroid(period)
          setTimer(secondsToTime(time));
        }
      });
    } catch (error) {
      console.log(error)
    }
  }, []);

  const getWallet = async () => {
    try {
      const { data } = await dbObject('/power-x/fetch-wallet.php')
      console.log(data)

      if (!data.error) {
        setWinWallet(data?.response.winWallet)
        setPlayWallet(data?.response.playWallet)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWallet()
    myOrder()
    resultHistory()
  }, [])

  const placeBit = async () => {
    try {

      const values = {
        period,
        coin,
        color,
        alphabet,
        points: amount
      }

      console.log(values)

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await dbObject.post('/power-x/place-bid.php', formData, config)
      console.log(data)
      if(!data.error) {
        getWallet()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const myOrder = async () => {
    try {
      const {data} = await dbObject.get('/power-x/my-orders.php')
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const resultHistory = async () => {
    try {
      const {data} = await dbObject.get('/power-x/result-history.php')
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <IsAuthenticate path='/power-x'>
      <div className="container">
        <Header title={"Power X"} />

        {/* Start */}
        <div
          className="modal fade start-box-outer"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog m-0 modal-dialog-centered">
            <div className="modal-content start-box">
              <div className="modal-header p-2 mb-3">
                <button data-bs-toggle="modal"
                  data-bs-target="#exampleModal" className="ms-auto close-btn" ><i className="bi bi-x-lg"></i></button>
              </div>
              <h2 className="game-name">{coin || alphabet || color}</h2>

              <div className="contract-point">
                <p>Contract Amount</p>

                <div className="withdrawal__input__field justify-content-start px-3" style={{ backgroundColor: '#e5e5e5' }}>
                  <div className="withdrawal__input__field__icon justify-content-start text-dark">
                    <Rupee />
                  </div>

                  <div className="input pe-3" style={{ fontWeight: '700', fontSize: '1.5rem' }}>{amount}</div>
                </div>
              </div>

              <div className="withdrawal__input__notes d-flex justify-content-between" >
                <p className="mb-0 mt-2">Service charge 10%</p>
                <p className="mb-0 mt-2">Delivery 50.00</p>
              </div>

              <Keyboard amount={amount} setAmount={setAmount} />

              <div className="mb-3 d-flex justify-content-center">
                <button
                  style={{
                    backgroundColor: 'rgb(252, 148, 13)'
                  }}

                  onClick={placeBit}
                  className="btn text-light py-3 modal-btn w-25"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>

          {/* Wallet */}
          <div className="wallet-container d-flex justify-content-between align-items-center gap-2 mt-3 mb-4">
            <div className="parity-top flex-column align-items-center w-100 p-2 ">
              <p className="mb-1">Win Wallet</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>₹{winWallet}</p>

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
              <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>₹{playWallet}</p>

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
                  navigate("/power-x/forward", { state: { from: location.pathname } })
                }
              >
                Forward
              </button>
            </div>
          </div>

          <div className="parity-top mt-4 px-4 py-2">
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

          <div className="power-x p-2 position-relative">
            <div className="game-coins position-relative">
              <div className="d-flex flex-column gold-coin" onClick={() => { setCoin('Gold'); setColor(''); setAlphabet('') }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <p className="mb-0 pt-3 text-center">GOLD</p>
                <p className="border-top w-75 text-center mx-auto">2X</p>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center silver-coin" onClick={() => { setCoin('Silver'); setColor(''); setAlphabet('') }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <p className="mb-0 pt-3 text-center">SILVER</p>

                <p className="border-top  w-75 text-center mx-auto">2X</p>
              </div>


            </div>

            <div className="prity-colors position-relative">
              <div
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="p-3"
                style={{ backgroundColor: "#d72e2a" }}
                onClick={() => { setCoin(''); setColor('Red'); setAlphabet('') }}
              >
                <p className="m-0">Red</p>
                <p className="m-0 border-top w-75 text-center">2X</p>
              </div>

              <div
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ backgroundColor: "#388e3d" }}
                onClick={() => { setCoin(''); setColor('Green'); setAlphabet('') }}
              >
                <p className="m-0">green</p>
                <p className="m-0 border-top w-75 text-center">3X</p>
              </div>

              <div
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ backgroundColor: "#1976d3" }}
                onClick={() => { setCoin(''); setColor('Blue'); setAlphabet('') }}
              >
                <p className="m-0">Blue</p>
                <p className="m-0 border-top w-75 text-center">4X</p>
              </div>


            </div>

            <div className="paritynum-btns position-relative">
              {firstCardList.map((item, i) => (
                <div onClick={() => { setCoin(''); setColor(''); setAlphabet(item) }} className="border" data-bs-toggle="modal" data-bs-target="#exampleModal" key={i}>
                  <p className="m-0">{item}</p>
                  <p className="m-0 border-top w-50 text-center">{2 + i}X</p>
                </div>
              ))}
            </div>

            <div
              className="single-entry"
            >
              <p className="mb-0">Single</p>
              <p className="mb-0">Entry</p>
              <p className="mb-0">Option</p>
            </div>
          </div>

          <div className="gameDetails-btn-group">
            <button
              onClick={() => setActiveBtn2("OtherPlayers")}
              className={`${activeBtn2 === "OtherPlayers" ? "gameDetails-activeBtn" : ""
                }`}
            >
              Result History
            </button>

            <button
              onClick={() => setActiveBtn2("MyOrder")}
              className={`${activeBtn2 === "MyOrder" ? "gameDetails-activeBtn" : ""
                }`}
            >
              My Orders
            </button>
          </div>

          {activeBtn2 === "OtherPlayers" ? (
            <div className="gameDetails-others">
              <div>
                <p className="mb-0">Period</p>
                <small className="mb-0">18:54</small>
              </div>

              <div style={{ textAlign: "center" }}>
                <p className="mb-0">User</p>
                <small className="mb-0">****18787</small>
              </div>

              <div style={{ textAlign: "center" }}>
                <p className="mb-0">Select</p>
                <small className="mb-0">2x2</small>
              </div>

              <div style={{ textAlign: "right" }}>
                <p className="mb-0">Point</p>
                <small className="mb-0">₹ 90</small>
              </div>
            </div>
          ) : (
            <div>
              <table style={{ width: "100%", marginTop: "1rem" }}>
                <thead>
                  <tr className="parity-myorder-header parity-myorder">
                    <td>Period</td>
                    <td>Select</td>
                    <td>Point</td>
                    <td>Result</td>
                    <td>Amount</td>
                  </tr>
                </thead>

                <tbody>
                  <tr className="parity-myorder">
                    <td>18:01</td>
                    <td className="parity-selected">
                      <p
                        style={{
                          backgroundColor: "#1776d7",
                          width: "100%",
                          color: "#fff",
                        }}
                      >
                        blue
                      </p>
                    </td>
                    <td>₹10</td>
                    <td className="parity-selected parity-result">
                      <p style={{ backgroundColor: "#388e3d" }}>7</p>
                    </td>
                    <td>+₹0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </IsAuthenticate>
  );
};

function ContinuousTab() {
  const fastParityContinuousList = [
    0,
    7,
    "-",
    8,
    0,
    6,
    1,
    9,
    3,
    5,
    0,
    7,
    7,
    8,
    0,
    7,
    8,
    0,
    6,
    1,
    9,
    3,
  ];
  return (
    <div className="continuous-tab">
      <div className="scroll-container">
        {fastParityContinuousList?.map((item, i) => (
          <div key={i} className="parity__records__circle">
            <div className="parity__records__circle__no">{item}</div>
            <div
              className="parity__records__circle__inner"
              style={{
                backgroundColor:
                  item === "-"
                    ? "#fec007"
                    : item % 2 === 0
                      ? "#f44238"
                      : "#3b8d3c",
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#f24337" : item === 5 ? "#1f98ef" : "",
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#0f45a2" : item === 5 ? "#388e3d" : "",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Record = () => {
  const numberList = [
    2,
    2,
    2,
    2,
    9,
    9,
    0,
    "-",
    5,
    9,
    8,
    8,
    8,
    8,
    6,
    4,
    8,
    7,
    1,
    4,
    9,
    7,
    1,
    2,
    8,
    1,
    4,
  ];

  return (
    <div className="parity-record">
      <p>Fast Parity Record</p>
      <div className="parity-record-box">
        {numberList.map((item, i) => (
          <div key={i} className="parity__records__circle">
            <div className="parity__records__circle__no">{item}</div>
            <div
              className="parity__records__circle__inner"
              style={{
                backgroundColor:
                  item === "-"
                    ? "#fec007"
                    : item % 2 === 0
                      ? "#f44238"
                      : "#3b8d3c",
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#f24337" : item === 5 ? "#1f98ef" : "",
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#0f45a2" : item === 5 ? "#388e3d" : "",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Probability = ({ probabilityBox }) => (
  <>
    <div className="probability">
      <p
        style={{
          textAlign: "center",
          marginTop: "1.2rem",
          fontSize: 15,
        }}
      >
        1 item today
      </p>
    </div>

    <div className="game-first-row">
      <div>
        <p>0</p>
      </div>

      <div>
        <p>0</p>
      </div>

      <div>
        <p>0</p>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: "#d72e2a" }}>R</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: "#ffcdd2" }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: "#1976d3" }}>B</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: "#bbdefa" }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: "#388e3d" }}>G</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: "#c8e6ca" }}
        ></div>
      </div>
    </div>

    <div className="probabilty-game-second-row game-second-row">
      {probabilityBox.map((item, i) => (
        <div key={i} className="game-second-row-color">
          <p>{item}</p>
        </div>
      ))}

      {probabilityBox.map((item, i) => (
        <div key={i} className="numbers">
          <p>{item}</p>
          <p>0</p>
        </div>
      ))}
    </div>
  </>
);

export default FastParity;
