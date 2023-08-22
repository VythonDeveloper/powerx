import './rechargehistory.css';
import { emptyBox, upi } from '../../assets';
import { Header } from '../../components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const RechargeHistory = () => {
  const location = useLocation()
  const [activeBtn, setActiveBtn] = useState("fast-parity");
  const [powerx, setPowerx] = useState([])
  const [duskadum, setDuskadum] = useState([])


  const getPowerx = async () => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <Header title={"Recharge History"} path={location?.state?.from || "/profile"} />
      <div className="gameHistory-btn-group mt-2">
        <button
          onClick={() => {
            setActiveBtn("fast-parity");
          }}
          className={`${
            activeBtn === "fast-parity" ? "gameHistory-activeBtn" : ""
          }`}
        >
          Power-X
        </button>
        <button
          onClick={() => {
            setActiveBtn("full-parity");
          }}
          className={`${
            activeBtn === "full-parity" ? "gameHistory-activeBtn" : ""
          }`}
        >
          Dus Ka Dum
        </button>
      </div>


      {activeBtn === "fast-parity" &&
        (!powerx.length ? (
          <div className="recharge-history-card-group">
            <Card
              orderId={"NHDI4DAD"}
              amount={'500.00'}
              date= {'10/20/2002'}
            />

         
        </div>
        ) : (
          <div className="emptyImage">
            <img src={emptyBox} alt="" />
          </div>
        ))}

      {activeBtn === "full-parity" &&
        (duskadum.length ? (
          <div className="recharge-history-card-group">
            <Card
              orderId={"NHDI4DAD"}
              amount={'500.00'}
              date= {'10/20/2002'}
            />

         
        </div>
        ) : (
          <div className="emptyImage">
            <img src={emptyBox} alt="" />
          </div>
        ))}
      

         
       
      </div>
 
  );
};

const Card = ({ orderId, amount, date }) => (
  <div className="recharge-history-card">
    <div className="top">
      <div>
        <p className='mb-0'>{orderId}</p>
      </div>

      <img src={upi} alt="" />
    </div>

    <div className="bottom">
      <div className='amount'>
        <p className='mb-0'>{Number(amount).toFixed(2)}</p>points
      </div>
      <p className='mb-0' style={{color: '#dbdbdb'}}>{date}</p>
    </div>
  </div>
);

export default RechargeHistory;
