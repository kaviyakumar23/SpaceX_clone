import HeaderImg from "../../images/header.png";
import "./Header.css";

const Header = () => {
  return (
    <div id="headerImg">
      <img alt="header" className="image" src={HeaderImg} />
    </div>
  );
};
export default Header;
