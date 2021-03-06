import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const handleRegister = async (user, history) => {
    try {
      let res = await axios.post("/api/auth", user);
      setUser(res.data.data);
      history.push("./");
    } catch (err) {
      alert("Register Failed");
    }
  };

  const handleLogin = async (user, history) => {
    try {
      let res = await axios.post("/api/auth/sign_in", user);
      setUser(res.data.data);
      history.push("/");
    } catch (err) {
      alert("error in logging in");
    }
  };

  const handleLogout = async (history) => {
    try {
      let res = await axios.delete("/api/auth/sign_out");
      setUser(null);
      history.push("/login");
    } catch (err) {
      console.log("Logout Failed");
    }
  };

  const handleUpdate = async (user) => {
    try {
      let res = await axios.put(`/api/users/${user.id}`, user);
      setUser(res.data);
    } catch (err) {
      console.log("Edit failed");
    }
  };

  const handleImageUpdate = async (fileState) => {
    try {
      const formData = new FormData();
      formData.append("file", fileState.file);
      let res = await axios.put(`/api/users/${user.id}/image`, formData);
      setUser(res.data);
    } catch (err) {
      alert("ERROR: Profile, updating user Image");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        handleRegister,
        handleLogout,
        handleLogin,
        handleUpdate,
        handleImageUpdate,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
