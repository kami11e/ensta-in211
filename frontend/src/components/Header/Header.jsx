import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => {
  const token = sessionStorage.getItem("JWTtoken");


  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <div>|</div>
      <Link className="Link" to="/counter">
        Counter
      </Link>
      <div>|</div>
      <Link className="Link" to="/users">
        Users
      </Link>
      <div>|</div>
      <Link className="Link" to="/about">
        About
      </Link>
      <div>|</div>
      <Link className="Link" to="/films">
        Films
      </Link>
      {token === null && (
        <div>
          |&nbsp;
          <Link className="Link" to="/Login">
            Login
          </Link></div>
      )}
      {token !== null && (
        <div>
          |&nbsp;
          <Link className="Link" to="/userspace">
            Personal Space
          </Link>
          &nbsp;|&nbsp;
          <Link className="Link" onClick={() => {
            sessionStorage.clear();
            window.location.href = `/`;
          }}>
            Logout
          </Link>
        </div>
      )}


    </div>
  );
};

export default Header;
