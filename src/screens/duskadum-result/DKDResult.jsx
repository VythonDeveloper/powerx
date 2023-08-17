import React, { useEffect, useState } from "react";
import "./duskadum-result.css";
import { Header } from "../../components";
import { dbObject } from "../../helper/constant";

const DKDResult = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getResultHistory();
  }, []);
  const getResultHistory = async () => {
    try {
      const { data } = await dbObject.get("/dus-ka-dum/result-history.php");
      console.log(data);

      if (!data.error) {
        const sortedData = data.response.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setResult(sortedData.slice(0, 5));

        console.log(sortedData.slice(0, 5));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#000" }}>
      <div className="container dus-ka-dum">
        <Header
          backgroundColor={"#fff"}
          title={"Result"}
          path={"/dus-ka-dum"}
        />

        <div className="result-history">
          <div className="header mt-4 p-2">
            <p className="mb-0">Period</p>
            <p className="text-center mb-0"></p>
            <p className="text-center mb-0">Number</p>
            <p className="text-end mb-0">Status</p>
          </div>

          {result?.map((item, i) => {
            const dateObject = new Date(item.date);
            const formattedTime = dateObject.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            return (
            <div className="value  p-2">
              <p className="mb-0">{item.period}</p>
              <p className="text-center mb-0"></p>
              <div className="text-center mb-0" style={{marginRight: item.status === 'Running' ? '2.4rem' : '2rem'}}>{item.number || '?'}</div>
              <p
                className={`text-end mb-0 ${item.status === 'Running'? 'text-danger': 'text-success'}`}
                style={{ fontSize: "18px", fontWeight: "500" }}
              >
                {item.status}
              </p>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default DKDResult;
