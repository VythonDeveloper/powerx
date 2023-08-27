import React, { useContext } from "react";
import { BottomNav, Header } from "../../components";
import "./refer.css";
import { ReferBanner } from "../../assets/svg/CustomSVG";
import { AppContext } from "../../context/AppContext";
import IsAuthenticate from "../../redirect/IsAuthenticate";

const Refer = () => {
  const { user } = useContext(AppContext);

  const shareLink = () => {
    // Replace this URL with the link you want to share
    const linkToShare = `https://zingo.online/auth-refer?refercode=${user.referCode}`;
    const message = `Ready to earn big while playing games? Join now with my referral code ${user.referCode} and join the ranks of 1000+ players who are making over 500 Rs daily! Let's win together!`;

    // Use the Web Share API to share the link
    if (navigator.share) {
      navigator
        .share({
          title: "Share this link",
          text: message,
          url: linkToShare,
        })
        .then(() => console.log("Link shared successfully"))
        .catch((error) => console.error("Error sharing link:", error));
    }
  };
  return (
    <IsAuthenticate>
      <div className="container">
        <BottomNav />
        <Header title={"Refer"} path={"/"} />

        <div className="mt-3 d-flex justify-content-center">
          <ReferBanner />
        </div>

        <div>
          <h1 className="text-center mt-4 refer-heading">
            Refer and Earn ₹500
          </h1>
          <p className="refer-desc text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit esse
            saepe, quaerat perspiciatis aliquam earum!
          </p>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button
            className="w-75 mb-2 withdraw__btn refer-btn"
            style={{ height: 55 }}
            onClick={shareLink}
          >
            Refer
          </button>
        </div>
      </div>
    </IsAuthenticate>
  );
};

export default Refer;
