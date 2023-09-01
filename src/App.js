import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import About from "./screens/about/About";
import Faq from "./screens/faq/Faq";
import DKDWithdraw from "./screens/withdraw/DKD/DKDWithdraw";
import DKDResult from "./screens/duskadum-result/DKDResult";
import ContactUs from "./screens/contact-us/ContactUs";
const Welcome = lazy(() => import("./screens/welcome/Welcome"));
const Home = lazy(() => import("./screens/home/Home"));
const FastParity = lazy(() => import("./screens/games/FastParity"));
const Parity = lazy(() => import("./screens/games/Parity"));
const FollowUs = lazy(() => import("./screens/follow-us/FollowUs"));
const ForgotPass = lazy(() => import("./screens/auth/ForgotPass"));
const ForwardPX = lazy(() => import("./screens/forward/ForwardPX"));
const ForwardDKD = lazy(() => import("./screens/forward/DKD/ForwardDKD"));
const Profile = lazy(() => import("./screens/profile/Profile"));
const Transaction = lazy(() => import("./screens/transaction/Transaction"));
const Signin = lazy(() => import("./screens/auth/Signin"));
const Signup = lazy(() => import("./screens/auth/Signup"));
const Recharge = lazy(() => import("./screens/recharge/Recharge"));
const DKDRecharge = lazy(() => import("./screens/recharge/DKDRecharge"));
const Withdraw = lazy(() => import("./screens/withdraw/Withdraw"));
const Transfer = lazy(() => import("./screens/transfer/Transfer"));
const DKDTransfer = lazy(() => import("./screens/transfer/DKD/DKDTransfer"));
const AddBank = lazy(() => import("./screens/bank/AddBank"));
const RechargeHistory = lazy(() =>
  import("./screens/recharge-history/RechargeHistory")
);
const Refer = lazy(() => import("./screens/refer/Refer"));
const WithdrawHistory = lazy(() => import('./screens/withdraw-history/WIthdrawHistory'))
const DKDWithdrawHistory = lazy(() => import('./screens/withdraw-history/DKDWithdrawHistory'))
const ReferInput = lazy(() => import('./screens/auth/Refer'))
const TransferHistory = lazy(() => import('./screens/transfer-historty/TransferHistory'))
const ForwardHistory = lazy(() => import('./screens/forward-history/ForwardHistory'))
const ResultHistoryPx = lazy(() => import('./screens/result-history-px/ResultHistoryPX'))

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
          <Route path="/auth-refer" element={<ReferInput />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/power-x" element={<FastParity />} />
          <Route path="/dus-ka-dum" element={<Parity />} />
          <Route path="/power-x/forward" element={<ForwardPX />} />
          <Route path="/dus-ka-dum/forward" element={<ForwardDKD />} />
          <Route path="/follow-us" element={<FollowUs />} />
          {/* <Route path="/transaction" element={<Transaction />} /> */}
         
          <Route path="/power-x/recharge" element={<Recharge />} />
          <Route path="/dus-ka-dum/recharge" element={<DKDRecharge />} />
          <Route path="/recharge-history" element={<RechargeHistory />} />
          <Route path="/dus-ka-dum/withdraw" element={<DKDWithdraw />} />
          <Route path="/dus-ka-dum/result" element={<DKDResult />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/dus-ka-dum/transfer" element={<DKDTransfer />} />
          <Route path="/bank" element={<AddBank />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/power-x/withdraw-history" element={<WithdrawHistory />} />
          <Route path="/dus-ka-dum/withdraw-history" element={<DKDWithdrawHistory />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/transfer-history" element={<TransferHistory />} />
          <Route path="/forward-history" element={<ForwardHistory />} />
          <Route path="/power-x/result-history" element={<ResultHistoryPx />} />


        </Routes>
      </Suspense>
    </>
  );
}

export default App;
