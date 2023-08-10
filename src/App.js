import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import About from "./screens/about/About";
import Faq from "./screens/faq/Faq";
import DKDWithdraw from "./screens/withdraw/DKD/DKDWithdraw";
const Welcome = lazy(() => import("./screens/welcome/Welcome"));
const Home = lazy(() => import("./screens/home/Home"));
const FastParity = lazy(() => import("./screens/games/FastParity"));
const Parity = lazy(() => import("./screens/games/Parity"));
const FollowUs = lazy(() => import("./screens/follow-us/FollowUs"));
const ForgotPass = lazy(() => import("./screens/auth/ForgotPass"));
const Forward = lazy(() => import("./screens/forward/Forward"));
const ForwardPX = lazy(() => import("./screens/forward/ForwardPX"));
const ForwardDKD = lazy(() => import("./screens/forward/DKD/ForwardDKD"));
const Profile = lazy(() => import("./screens/profile/Profile"));
const Transaction = lazy(() => import("./screens/transaction/Transaction"));
const Signin = lazy(() => import("./screens/auth/Signin"));
const Signup = lazy(() => import("./screens/auth/Signup"));
const GameHistory = lazy(() => import("./screens/game-history/GameHistory"));
const Recharge = lazy(() => import("./screens/recharge/Recharge"));
const Withdraw = lazy(() => import("./screens/withdraw/Withdraw"));
const Transfer = lazy(() => import("./screens/transfer/Transfer"));
const DKDTransfer = lazy(() => import("./screens/transfer/DKD/DKDTransfer"));
const Bank = lazy(() => import("./screens/bank/Bank"));
const AddBank = lazy(() => import("./screens/bank/AddBank"));
const RechargeHistory = lazy(() =>
  import("./screens/recharge-history/RechargeHistory")
);
const Refer = lazy(() => import("./screens/refer/Refer"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "90vh" }}
          >
            <div
              className="spinner-border text-warning"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/power-x" element={<FastParity />} />
          <Route path="/parity" element={<Parity />} />
          <Route path="/forward" element={<Forward />} />
          <Route path="/power-x/forward" element={<ForwardPX />} />
          <Route path="/dus-ka-dum/forward" element={<ForwardDKD />} />
          <Route path="/forward" element={<Forward />} />
          <Route path="/follow-us" element={<FollowUs />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/game-history" element={<GameHistory />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/recharge-history" element={<RechargeHistory />} />
          <Route path="/dus-ka-dum/withdraw" element={<DKDWithdraw />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/dus-ka-dum/transfer" element={<DKDTransfer />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/add-bank" element={<AddBank />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
