import madame from "../public/hands.gif";

export default function Home(props) {
  return (
    <div className="home">
      <h4 className="opening-banner">
        Madame's Parlor
        <br /> of Fortune
      </h4>
      <img src={madame} className="hands-img" />
    </div>
  );
}
