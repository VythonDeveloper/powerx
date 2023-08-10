import React, { useEffect, useState } from "react";
import "./game.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { database } from '../../firebase.config'
import { onValue, ref, set } from 'firebase/database';
import { dbObject } from "../../helper/constant";
import { Rupee } from "../../assets/svg/CustomSVG";
import Keyboard from "../../components/keyboard/Keyboard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Parity = () => {
  const navigate = useNavigate();
  const firstCardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [activeBtn, setActiveBtn] = useState("probability");
  const [activeBtn2, setActiveBtn2] = useState("OtherPlayers");
  const [timer, setTimer] = useState('0:00');
  const [period, setPeroid] = useState('000000000000')
  const [winWallet, setWinWallet] = useState('0.00')
  const [playWallet, setPlayWallet] = useState('0.00')
  const [amount, setAmount] = useState('')

  const location = useLocation();

  function secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const dusKaDamRef = ref(database, 'dus-ka-dum/timer');

    try {
      onValue(dusKaDamRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
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
      const { data } = await dbObject('/dus-ka-dum/fetch-wallet.php')
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
  }, [])

  const [swiper, setSwiper] = useState(null);
  const [showMyBid, setShowMyBid] = useState(false)


  const result = [
    {
      time: '12:05pm',
      result: '5'
    },

    {
      time: '12:05pm',
      result: '10'
    },

    {
      time: '12:05pm',
      result: '1'
    },

    {
      time: '12:05pm',
      result: '8'
    },

    {
      time: '12:05pm',
      result: '6'
    },

    {
      time: '12:05pm',
      result: '5'
    },

    {
      time: '12:05pm',
      result: '10'
    },

    {
      time: '12:05pm',
      result: '1'
    },

    {
      time: '12:05pm',
      result: '8'
    },

    {
      time: '12:05pm',
      result: '6'
    },

  ]

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };



  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#000' }}>
      <div className="container dus-ka-dum">
        <Header backgroundColor={'#fff'} title={"10 Ka Dum"} />

        {/* Start */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content start-box">
              <h2 className="game-name">Gold</h2>
              <p>Points</p>

              <div className="points-div">
                <h3>INR 0.0</h3>
                <button onClick={() => navigate("/recharge")}>
                  <i className="fa-solid fa-clock-rotate-left"></i> Recharge
                </button>
              </div>

              <div className="contract-point">
                <p>Contract Amount</p>

                <div className="withdrawal__input__field " style={{ backgroundColor: '#e5e5e5' }}>
                  <div className="withdrawal__input__field__icon custon-ruppe">
                    <Rupee />
                  </div>

                  <div className="w-100 input" style={{ fontWeight: '700', fontSize: '1.5rem' }}>{amount}</div>
                </div>
              </div>

              <div className="withdrawal__input__notes d-flex justify-content-between" >
                <p className="mb-0 mt-2">Service charge 10%</p>
                <p className="mb-0 mt-2">Delivery 50.00</p>
              </div>

              <Keyboard amount={amount} setAmount={setAmount} />

              <div className="mt-4 mb-3 d-flex justify-content-center">
                <button
                  style={{
                    backgroundColor: 'rgb(252, 148, 13)'
                  }}
                  className="btn text-light py-3 modal-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Wallet */}
          <div className="wallet-container d-flex justify-content-between align-items-center gap-2 mt-3">
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
                  navigate("/dus-ka-dum/withdraw", { state: { from: location.pathname } })
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
                  navigate("/dus-ka-dum/transfer", { state: { from: location.pathname } })
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
                  navigate("/dus-ka-dum/forward", { state: { from: location.pathname } })
                }
              >
                Forward
              </button>
            </div>
          </div>

          {/* Timer */}
          <div className="parity-top mt-4 px-4 py-2">
            <div className="parity-period">
              <p className="">5 Minute</p>
              <p className="mb-0">04/08/23 12:30 PM</p>
            </div>

            <div className="parity-count">
              <p className="m-0 mt-1">Time Left</p>
              <div className="parity-count-box p-2 ">
                <p className="m-0" style={{ color: '#000' }}>{timer}</p>
              </div>
            </div>
          </div>

          <div className="slider d-flex align-items-center gap-2">
            <div onClick={handlePrev} className="slider-btn">
              <i class="bi bi-arrow-left-square-fill"></i>
            </div>
            <Swiper onSwiper={setSwiper}
              spaceBetween={15}
              slidesPerView={5}>
              {
                result.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="slide-item d-flex flex-column align-item-center">
                      <div>
                        {item.result}
                      </div>
                      <p className="mb-0 text-danger" style={{ fontSize: '12px' }} >{item.time}</p>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>

            <div onClick={handleNext} className="slider-btn">
              <i class="bi bi-arrow-right-square-fill"></i>
            </div>
          </div>


          <div className="paritynum-btns mt-4 p-4" >
            {firstCardList.map((item, i) => (
              <div className="position-relative item mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal" key={i}>
                <p className="m-0 text-light">{item}</p>
                <span className="dus-ka-dum-flag text-light">
                  <span className="w-100 h-75 mt-2 text-center bg-warning">{i % 2 === 0 ? '₹500' : null}</span></span>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="enter-btn">Enter</button>
          </div>

          <div>
            <table style={{ width: "100%", marginTop: "1rem" }}>
              <thead>
                <tr className="parity-myorder-header parity-myorder">
                  <td className="d-flex align-items-center gap-1" onClick={() => setShowMyBid(!showMyBid)}>Entry {showMyBid ? <i class="bi bi-arrow-down-circle"></i>: <i class="bi bi-arrow-up-circle"></i>}</td>
                  <td className="mx-auto">ID</td>
                  <td className="mx-auto">Total</td>
                  <td className="mx-auto">Result</td>
                  <td>Won</td>
                </tr>
              </thead>

              <tbody>
                <tr className="parity-myorder">
                  <td>1</td>
                  <td className="parity-selected" style={{ fontSize: 14 }}>
                    12/5/2024 12:50pm
                  </td>
                  <td className="mx-auto">₹10</td>
                  <td className="parity-selected parity-result mx-auto">
                    <p style={{ backgroundColor: 'transparent', color: '#000' }}>7</p>
                  </td>
                  <td>+₹0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {
            showMyBid && (
              <div className="d-flex justify-content-between mt-2">
                {
                  firstCardList.map((item, i) => (
                    <div key={i}>
                      <p className="mb-0 text-danger fw-blod fw-bold">{item}</p>
                      <p>2</p>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};


export default Parity