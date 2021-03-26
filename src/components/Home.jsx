//IMPORTS//
import Register from "./Register";
import madame from "../public/hands.gif";

export default function Home(props) {
  return (
    <div className="home">
      <h4 className="opening-banner">Madame's Parlor of Fortune</h4>
      <Register currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} />
      <img src={madame} className="hands-img" />
    </div>
  );
}
