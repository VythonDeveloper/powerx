import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Header } from '../../../components';
import './DKDTransfer.css'
import { Rupee } from '../../../assets/svg/CustomSVG';
import Keyboard from '../../../components/keyboard/Keyboard';

const Transfer = () => {
    const location = useLocation();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(true);
    const [bonusAmount, setBonusAmount] = useState('0.00')
    const [bonus, setBonus] = useState('10')

    useEffect(() => {
        setBonusAmount(Number(amount) * Number(bonus) / 100)
    }, [amount])

    return (
        <div style={{backgroundColor: '#fff', minHeight: '100vh'}}>
            <div className="container dkd-container">
                <Header backgroundColor={'#fff'} title={"Transfer"} path={location?.state?.from || "/"} />

                <div className="withdrawal__page__balance__section mt-4">
                    <center>
                        <div className="withdrawal__page__balance__section__top">My Balance</div>
                        <div
                            className="withdrawal__page__balance__section__bottom"
                            style={{ fontFamily: "sans-serif" }}
                        >
                            ₹398.48
                        </div>
                    </center>
                </div>

                <div className="withdrawal__amount__field">
                    <div className="withdrawal__field__header">
                        Transfer to Play Wallet{" "}
                        <br />
                        <span style={{ fontSize: 12, fontWeight: "300" }}>Min Rs. 10 & thereafter multiple of Rs. 10</span>
                    </div>
                    <div className="withdrawal__input__field">
                        <div className="withdrawal__input__field__icon">
                            <Rupee />
                        </div>

                        <div className='w-100 input'>{amount}</div>
                    </div>

                    <div className="withdrawal__input__notes">
                        <p className="mb-0 mt-2">Bonus {bonus}% = ₹{bonusAmount}</p>
                    </div>


                    <br />
                    <button
                        className={`withdraw__btn ${error && "recharge__btn_disabled"}`}
                        style={{
                            height: 45,
                        }}
                        disabled={error}
                    >
                        Transfer
                    </button>
                </div>

                <Keyboard color={'#c1bebe27'} setAmount={setAmount} amount={amount} />

                <div className="withdrawal__records__section">
                    <div className="withdrawal__records__section__record__top"></div>
                    <div className="withdrawal__records__section__bottom">
                        <div className="withdrawal__records__section__bottom__header">
                            Transfer Records
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
                                            Bonus: 30
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transfer