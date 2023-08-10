import './rechargehistory.css';
import { upi } from '../../assets';
import { Header } from '../../components';
import { useLocation } from 'react-router-dom';

const RechargeHistory = () => {
  const location = useLocation()

  return (
    <div className="container">
      <Header title={"Recharge History"} path={location?.state?.from || "/"} />
        <div className="recharge-history-card-group">
            <Card
              orderId={"NHDI4DAD"}
              amount={'500.00'}
              date= {'10/20/2002'}
            />

         
        </div>
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
