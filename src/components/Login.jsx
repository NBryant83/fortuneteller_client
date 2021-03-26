import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import Modal from './modals/CustomModal'

export default function Login(props) {
  //SET STATE//
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
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`,
        requestBody
      );
      // console.log(response);
      const { token } = response.data;
      //console.log(token);
      localStorage.setItem("jwtToken", token);

      const decoded = jwt_decode(token);
      console.log(decoded);
      props.setCurrentUser(decoded);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setMessage(error.response.data.msg);
      } else {
        console.log(error);
      }
    }
  };

  if (props.currentUser) {
    return (
      <Redirect
        to="/profile"
        component={Profile}
        currentUser={props.currentUser}
      />
    );
  }

  return (
    <div className="login">
      {
  this.state.showModal &&
  <Modal
    closeTimeoutMS={200}
    isOpen
    contentLabel="modal"
    onRequestClose={() => this.toggleModal()}
  >
    <h2>Add modal content here</h2>
  </Modal>
}
      <h3 className="login-header">Login</h3>
      <p>{message}</p>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="input-bar"
        />

        <br />
        <br />
        <br />
        <label htmlFor="password">password: </label>
        <input
          type="password"
          value={password}
          placeholder="password"
          className="input-bar"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="submit" className="button" />
      </form>
    </div>
  );
}
