import { createContext, useEffect, useState } from "react";
import { dbObject } from "../helper/constant";
import { auth } from "../firebase.config";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await dbObject.get("/users/auth.php");
      if (!data.error) {
        setUser(data.response);
      }

      setLoading(false);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getUser = async () => {
  //   const user = auth.currentUser;
  //   console.log("current user", user);
  // };

  useEffect(() => {
    getData();
    // getUser();
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
