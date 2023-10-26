import React, { useState, useEffect } from "react";
import { loggedIn, firebaseObserver, auth } from "../config/firebase";
import axios from "axios";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(loggedIn());
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseObserver.subscribe("authStateChanged", (data) => {
      setAuthenticated(data);
      setIsLoading(false);
    });
    return () => {
      firebaseObserver.unsubscribe("authStateChanged");
    };
  }, []);

  const getUser = async () => {
    const token = await auth.currentUser.getIdToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`https://localhost:44337/api/friendship`,{}, config)
      .then((res) => {
        const user = res.data;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      {process.env.REACT_APP_NOT_SECRET_CODE}
      {authenticated ? (
        <div>
          <div>user is logged in.</div>
          <button onClick={getUser}>Get User</button>
        </div>
      ) : (
        <div>user not logged in.</div>
      )}
    </div>
  );
};

export default Home;
