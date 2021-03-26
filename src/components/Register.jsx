import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import Profile from "./Profile";
import("../App.css");

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`,
        requestBody
      );

      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      // console.log(token)

      const decoded = jwt_decode(token);
      console.log(decoded)

      props.setCurrentUser(decoded);
    } catch (error) {
      console.log(error);
      console.log(props);
      // if (error.response.status === 400) {
      //  // console.log(error.response);
      //   setMessage(error.response.data.msg);
      // } else {
      //   console.log(error);
      // }
    }
  };

  if (props.currentUser) {
    return (
      <Redirect
        to="/profile"
        component={Profile}
        currentUser={props.currentUser}
      />
    )};

  return (
    <div className="register">
      <h3 className="register-header">Register</h3>
      <p>{message}</p>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username-input">username </label>
        <input
          id="username-input"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="input-bar"
        />
        <br />
        <br />
        <br />
        <label htmlFor="password-input">password </label>
        <input
          id="password-input"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input-bar"
        />

        <input type="submit" value="Register" className="button" />
      </form>
    </div>
  );
}
