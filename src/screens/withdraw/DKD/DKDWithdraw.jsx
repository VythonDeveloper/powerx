import React, { useEffect, useState } from "react";
import "./DKDWithdraw.css";
import { Header } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Rupee } from "../../../assets/svg/CustomSVG";
import Keyboard from "../../../components/keyboard/Keyboard";
import { dbObject } from "../../../helper/constant";

const DKDWithdraw = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [winWallet, setWinWallet] = useState("0.00");
  const [bank, setBank] = useState(null);
  const [minWithdraw, setminWithdraw] = useState("0.00");
  const [withdrawFees, setwithdrawFees] = useState("0");
  const [withdrawHistory, setWithdrawHistory] = useState([]);

  const getWallet = async () => {
    try {
      const { data } = await dbObject("/dus-ka-dum/fetch-wallet.php");
      console.log(data);

      if (!data.error) {
        setWinWallet(data?.response.winWallet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBank = async () => {
    try {
      const { data } = await dbObject.get("/bank-account/fetch.php");

      console.log(data);

      if (data?.response) {
        setBank(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getControlFields = async () => {
    try {
      const { data } = await dbObject.get("/dus-ka-dum/control-fields.php");
      console.log(data);

      if (!data.error) {
        setminWithdraw(data.response.minWithdraw);
        setwithdrawFees(data?.response.withdrawFees);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWithdrawHitory = async () => {
    try {
      const {data} = await dbObject.get('/dus-ka-dum/withdraw-history.php')
      console.log(data)

      if(!data.error) {
        setWithdrawHistory(data?.response?.slice(0, 1))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWallet();
    getBank();
    getControlFields()
    getWithdrawHitory()
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <div className="container dus-ka-dum">
        <Header
          backgroundColor={"#fff"}
          title={"Withdraw"}
          path={location?.state?.from || "/"}
        />

        <div className="withdrawal__page__balance__section mt-4">
          <center>
            <div
              className="withdrawal__page__balance__section__top"
              style={{ color: "#434343" }}
            >
              My Balance
            </div>
            <div
              className="withdrawal__page__balance__section__bottom"
              style={{ fontFamily: "sans-serif", color: "#000" }}
            >
              ₹{winWallet}
            </div>
          </center>
        </div>

        {!bank ? (
          <div
            onClick={() =>
              navigate("/bank", { state: { from: location.pathname } })
            }
            className="bank-card bg-light"
        
          >
            <div>
              <i className="bi bi-bank2"></i>
            </div>
            <p className="text-dark">Tab to add first account</p>
          </div>
        ) : (
          <div className="passbook__details">
            <div className="passbook__details__in">
              <div className="passbook__detail__box" style={{ marginTop: 15 }}>
                <div className="to__bank">Bank</div>
                <div className="passbook__active__container">
                  <div className="passbook__active">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path>
                    </svg>
                  </div>
                </div>
                <div className="passbook__detail">
                  <div className="passbook__detail__col">
                    <div className="passbook__detail__col__left">Name</div>
                    <div className="passbook__detail__col__right">
                      Ashadu Zaman
                    </div>
                  </div>
                  <div className="passbook__detail__col">
                    <div className="passbook__detail__col__left">IFSC</div>
                    <div className="passbook__detail__col__right">
                      SOMETHING002
                    </div>
                  </div>
                  <div className="passbook__detail__col">
                    <div className="passbook__detail__col__left">
                      Account Number
                    </div>
                    <div className="passbook__detail__col__right">
                      0616261626162
                    </div>
                  </div>
                </div>
              </div>
              <div className="changeCard">
                <div
                  onClick={() =>
                    navigate("/bank", { state: { from: location.pathname } })
                  }
                >
                  change &gt;
                </div>
              </div>
            </div>
          </div>
        )}

   

        <div className="withdrawal__amount__field">
          <div className="withdrawal__field__header">
            Withdrawal Amount{" "}
            <span style={{ fontSize: 12, fontWeight: "300" }}>
              (Min. INR {minWithdraw})
            </span>
          </div>
          <div className="withdrawal__input__field">
            <div className="withdrawal__input__field__icon">
              <Rupee />
            </div>

            <div className="w-100 input">{amount}</div>
          </div>
          <div className="withdrawal__input__notes">
            <p className="mb-0 mt-2">Service charge {withdrawFees}%</p>
          </div>

          <br />
          <button
            className={`withdraw__btn`}
            style={{
              height: 45,
            }}
          >
            Withdraw
          </button>
        </div>

        <Keyboard color={"#c1bebe27"} setAmount={setAmount} amount={amount} />

        <div className="withdrawal__records__section">
          <div className="withdrawal__records__section__record__top"></div>
          <div className="withdrawal__records__section__bottom">
            <div className="withdrawal__records__section__bottom__header">
              Withdrawal Records
            </div>
            <div className="withdrawalRecords__container">
              <div className="withdrawalRecords__container__box">
                <div className="withdrawalRecords__container__box__top">
                  <div
                    className="withdrawalRecords__container__box__top__col"
                    style={{ flexBasis: "32%", width: "100%" }}
                  >
                    <div className="withdrawalRecords__container__box__top__top">
                      Amount
                    </div>
                    <div
                      className="withdrawalRecords__container__box__top__bottom"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      ₹158
                    </div>
                  </div>
                  <div
                    className="withdrawalRecords__container__box__top__col"
                    style={{ flexBasis: "34%", width: "100%" }}
                  >
                    <div className="withdrawalRecords__container__box__top__top">
                      Time
                    </div>
                    <div className="withdrawalRecords__container__box__top__bottom">
                      01/25 16:24
                    </div>
                  </div>
                  <div
                    className="withdrawalRecords__container__box__top__col"
                    style={{
                      flexBasis: "34%",
                      width: "100%",
                      textAlign: "right",
                    }}
                  >
                    <div className="withdrawalRecords__container__box__top__top">
                      Status
                    </div>
                    <div className="withdrawalRecords__container__box__top__bottom">
                      Pending
                    </div>
                  </div>
                </div>
                <div className="withdrawalRecords__container__box__bottom">
                  <div className="withdrawalRecords__container__box__bottom__top">
                    <div className="withdrawalRecords__container__box__bottom__top__col">
                      Actually Arrived: 128
                    </div>
                    <div className="withdrawalRecords__container__box__bottom__top__col">
                      Fee: 30
                    </div>
                  </div>
                  <div
                    className="withdrawalRecords__container__box__bottom__top"
                    style={{ marginTop: 12 }}
                  >
                    <div className="withdrawalRecords__container__box__bottom__top__col">
                      Name:
                    </div>
                    <div className="withdrawalRecords__container__box__bottom__top__col">
                      Harsh Kumar Jha
                    </div>
                  </div>
                  <div className="withdrawalRecords__container__box__bottom__top">
                    <div className="withdrawalRecords__container__box__bottom__top__col">
                      UPI:
                    </div>
                    <div className="withdrawalRecords__container__box__bottom__top__col">
                      mrhulk@apl
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DKDWithdraw;
