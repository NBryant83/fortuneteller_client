import { Link } from "react-router-dom";
import Register from "../Register";

//Functions to reveal Login & Logout in NavBar//
export default function Navbar(props) {
  const loggedIn = (
    <>
      <Link to="/" className="link">
        <span onClick={props.handleLogout}>Log out</span>
      </Link>
    </>
  );
  const loggedOut = (
    <>
      <Link to="/login" className="link">
        Login
      </Link>
    </>
  );

  // //Functions to reveal Register in NavBar//
  const registerIn = (
    <>
      <Link to="/register" className="link">
        Register
      </Link>
    </>
  );

  //Functions to reveal Crystal Ball in NavBar//
  const crystalBallIn = (
    <>
      <Link to="/crystal-ball" className="link">
        Crystal Ball
      </Link>
    </>
  );

  //Functions to reveal Profile in NavBar//
  const profileIn = (
    <>
      <Link to="/profile" className="link">
        Profile
      </Link>
    </>
  );

  return (
    <nav className="navbar">
      {props.currentUser ? profileIn : ""}
      {props.currentUser ? crystalBallIn : ""}
      {!props.currentUser ? registerIn : ""}
      {props.currentUser ? loggedIn : loggedOut}
    </nav>
  );
}
