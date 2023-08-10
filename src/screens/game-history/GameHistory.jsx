import React, { useState } from "react";
import { Header } from "../../components";
import "./game-history.css";
import { emptyBox } from "../../assets";

const GameHistory = () => {
  const [activeBtn, setActiveBtn] = useState("fast-parity");
  const [fastParity, setFastParity] = useState([]);
  const [fullParity, setFullParity] = useState([]);
  return (
    <div className="container">
      <Header title={"Game History"} path="/profile" />

      <div className="gameHistory-btn-group mt-2">
        <button
          onClick={() => {
            setActiveBtn("fast-parity");
          }}
          className={`${
            activeBtn === "fast-parity" ? "gameHistory-activeBtn" : ""
          }`}
        >
          Fast Parity
        </button>
        <button
          onClick={() => {
            setActiveBtn("full-parity");
          }}
          className={`${
            activeBtn === "full-parity" ? "gameHistory-activeBtn" : ""
          }`}
        >
          Parity
        </button>
      </div>

      {activeBtn === "fast-parity" &&
        (!fastParity.length ? (
          <div className="game-history mt-4">
            <FastParityCard />
            <FastParityCard />
          </div>
        ) : (
          <div className="emptyImage">
            <img src={emptyBox} alt="" />
          </div>
        ))}

      {activeBtn === "full-parity" &&
        (fullParity.length ? (
          <div className="game-history mt-4">
            <FullParityCard />
            <FullParityCard />
            <FullParityCard />
            <FullParityCard />
          </div>
        ) : (
          <div className="emptyImage">
            <img src={emptyBox} alt="" />
          </div>
        ))}
    </div>
  );
};

const FastParityCard = () => (
  <div className="history-parity">
    <div className="date">
      <p className="mb-0">Period 15:58</p>
      <p className="mb-0">11/07/2023 15:58</p>
    </div>

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
              className="mb-0"
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
              <p className="mb-0" style={{ backgroundColor: "#388e3d" }}>7</p>
            </td>
            <td>+₹0.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="hr80" />

    <div className="parity-delivery">
      <p>Delivery: ₹19.00</p>
      <p>Bonus: ₹1.00</p>
    </div>

    <div className="history-parity-btn">
      <button style={{ backgroundColor: "#ffdcaa" }}>To Verify</button>
      <button style={{ backgroundColor: "#e99d97" }}>Complaint</button>
    </div>
  </div>
);

const FullParityCard = () => (
  <div className="history-parity">
    <div className="date">
      <p>Period 15:58</p>
      <p>11/07/2023 15:58</p>
    </div>

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
              <p>3</p>
            </td>
            <td>₹10</td>
            <td className="parity-selected parity-result">
              <p>4</p>
            </td>
            <td>₹0.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="hr80" />

    <div className="parity-delivery">
      <p>Delivery: ₹19.00</p>
      <p>Bonus: ₹1.00</p>
    </div>

    <div className="history-parity-btn">
      <button style={{ backgroundColor: "#ffdcaa" }}>To Verify</button>
      <button style={{ backgroundColor: "#e99d97" }}>Complaint</button>
    </div>
  </div>
);

export default GameHistory;
