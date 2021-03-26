import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { quotes } from "../public/quotes.json";
//Crystal Ball Gif//
import spinningBall from "../public/crystal_ball.gif";

export default function CrystalBall(props) {
  //SET STATE//
  const [currentWisdom, setCurrentWisdom] = useState("");
  const history = useHistory();

  //GENERATE RANDOM WISDOM//
  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return randomQuote.quote;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${props.currentUser.id}/quotes`,
      {
        quote: currentWisdom,
      }
    );
    history.push("/profile");
  };

  return (
    <div className="container-eyes">
      <div className="crystal-ball">
        <h3 className="future-banner">Come to see your future?</h3>
        <h4 className="wisdom">{currentWisdom}</h4>
        <h1>
          <button
            className="big-button"
            onClick={() => {
              const randomQuote = getRandomQuote();
              setCurrentWisdom(randomQuote);
            }}
          >
            <img src={spinningBall} />
          </button>
        </h1>
        {currentWisdom && (
          <form onSubmit={handleSubmit}>
            <input type="hidden" value={currentWisdom} />
            <input type="submit" value="Save Wisdom" className="button" />
          </form>
        )}
      </div>
    </div>
  );
}
