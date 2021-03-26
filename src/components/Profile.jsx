import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Profile(props) {
  // const [message, setMessage] = useState("");
  const [quotes, setQuotes] = useState([]);
  //get user id from state
  const usersId = props.currentUser.id;
  // console.log("🚽", usersId);

  //use userId to query db (via axios) & get the user

  //once we have  that user, we can map through the array
  useEffect(() => {
    const secretMessage = async function () {
      try {
        const token = localStorage.getItem("jwtToken");
        const authHeaders = {
          Authorization: token,
        };

        // const response = await axios.get(
        //   `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`,
        //   { headers: authHeaders }
        // );

        const quotesFromDb = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${props.currentUser.id}/quotes`
        );
        console.log("🗣", quotesFromDb);

        //setting States
        setQuotes(quotesFromDb.data);
        // setMessage(response.data.msg);
      } catch (error) {
        if (error.response.status === 400) {
          props.handleLogout();
        } else {
          console.log(error);
        }
      }
    };
    secretMessage();
  }, [props]);

  const newArray = quotes.map((quote, idx) => {
    return (
      <li key={idx} className="list-item">
        {quote.quote} <br />
        {new Date(quote.date).toLocaleString()}
      </li>
    );
  });
  return (
    <div className="profile">
      <h4>Hello {props.currentUser.username}. I was expecting you.</h4>

      <ul className="list">{newArray}</ul>
    </div>
  );
}
