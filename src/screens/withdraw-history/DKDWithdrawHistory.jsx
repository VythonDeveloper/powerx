import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useLocation } from "react-router-dom";
import { dbObject } from "../../helper/constant";
import "./withdraw-history.css";
import IsAuthenticate from "../../redirect/IsAuthenticate";

const WIthdrawHistory = () => {
  const location = useLocation();
  const [withdrawHistory, setWithdrawHistory] = useState([]);

  const getWithdrawHitory = async () => {
    try {
      const { data } = await dbObject.get("/dus-ka-dum/withdraw-history.php");
      if (!data.error) {
        setWithdrawHistory(data?.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWithdrawHitory();
  });
  return (
    <IsAuthenticate path={'/dus-ka-dum/withdraw-history'}>
    <div
      className="container"
      style={{ minHeight: "100vh", backgroundColor: "#fff" }}
    >
      <Header
        backgroundColor={"#fff"}
        title={"Withdraw History"}
        path={location?.state?.from || "/home"}
      />

      {withdrawHistory.map((item, i) => (
        <div key={i} className="withdrawalRecords__container">
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
                  ₹{item.withdrawPoints}
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
                  {/* 01/25 16:24 */}
                  {item.date}
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
                  {item.status}
                </div>
              </div>
            </div>
            <div className="withdrawalRecords__container__box__bottom">
              <div
                className="withdrawalRecords__container__box__bottom__top"
                style={{ marginTop: 12 }}
              >
                <div className="withdrawalRecords__container__box__bottom__top__col">
                  Name:
                </div>
                <div
                  style={{ textTransform: "capitalize" }}
                  className="withdrawalRecords__container__box__bottom__top__col"
                >
                  {item.accountHolder}
                </div>
              </div>

              <div className="withdrawalRecords__container__box__bottom__top">
                <div className="withdrawalRecords__container__box__bottom__top__col">
                  Account Number:
                </div>
                <div className="withdrawalRecords__container__box__bottom__top__col">
                  {item.accountNumber}
                </div>
              </div>
              <div className="withdrawalRecords__container__box__bottom__top">
                <div className="withdrawalRecords__container__box__bottom__top__col">
                  UPI:
                </div>
                <div className="withdrawalRecords__container__box__bottom__top__col">
                  {item.upiAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </IsAuthenticate>
  );
};

export default WIthdrawHistory;
