import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../components";
import "./transfer.css";
import { Rupee } from "../../assets/svg/CustomSVG";
import Keyboard from "../../components/keyboard/Keyboard";
import { dbObject } from "../../helper/constant";
import { toast } from "react-toastify";
import Toaster, { toastOptions } from "../../components/toaster/Toaster";
import IsAuthenticate from "../../redirect/IsAuthenticate";

const Transfer = () => {
  const location = useLocation();
  const [amount, setAmount] = useState("");
  const [level1Bonus, setLevel1Bonus] = useState(0);
  const [level2Bonus, setLevel2Bonus] = useState(0);
  const [bonus, setBonus] = useState("0");
  const [winWallet, setWinWallet] = useState("0.00");
  const [minimunTransfer, setMinimumTrasfer] = useState();

  const getWallet = async () => {
    try {
      const { data } = await dbObject.get("/power-x/fetch-wallet.php");

      if (!data.error) {
        setWinWallet(data?.response.winWallet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getControlFields = async () => {
    try {
      const { data } = await dbObject.get("/power-x/control-fields.php");
      if (!data.error) {
        setBonus(data.response.transferBonus);
        setMinimumTrasfer(data?.response.minTransfer);
        setLevel2Bonus(data.response.level2Bonus);
        setLevel1Bonus(data.response.level1Bonus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWallet();
    getControlFields();
  }, []);

  const transferHandler = async () => {
    try {
      const values = {
        points: amount,
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
        "/power-x/transfer.php",
        formData,
        config
      );

      if (!data.error) {
        toast.success(data.message, toastOptions);
        getWallet();
        setAmount("");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IsAuthenticate path={'/transfer'}>
      <div className="container px-transfer" style={{paddingTop: 55}}>
        <Header title={"Transfer"} path={location?.state?.from || "/"} />
        <Toaster />

        <div className="withdrawal__page__balance__section">
          <center>
            <div className="withdrawal__page__balance__section__top">
              Win Balance
            </div>
            <div
              className="withdrawal__page__balance__section__bottom"
              style={{ fontFamily: "sans-serif" }}
            >
              ₹{winWallet}
            </div>
          </center>
        </div>

        <div className="withdrawal__amount__field">
          <div className="withdrawal__field__header">
            Transfer to Play Wallet <br />
            <span style={{ fontSize: 12, fontWeight: "300" }}>
              Min Rs. {minimunTransfer} & thereafter multiple of Rs. 5
            </span>
          </div>
          <div className="withdrawal__input__field">
            <div className="withdrawal__input__field__icon">
              <Rupee />
            </div>

            <div className="w-100 input">{amount}</div>
          </div>

          <div className="withdrawal__input__notes">
            <p className="mb-0 mt-2">Bonus {bonus}%</p>
            <p className="mb-0 mt-2">
              Referral Fees {Number(level1Bonus) + Number(level2Bonus)}%
            </p>
          </div>

          <br />
          <button
            className={`withdraw__btn `}
            style={{
              height: 45,
            }}
            onClick={transferHandler}
          >
            Transfer
          </button>
        </div>

        <Keyboard setAmount={setAmount} amount={amount} />
      </div>
    </IsAuthenticate>
  );
};

export default Transfer;
