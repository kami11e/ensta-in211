import { Link } from 'react-router-dom';
import './Header.css';
import { parseJwt } from '../../helper/parse';
const Header = () => {
  const token = sessionStorage.getItem('JWTtoken');
  let parsed;
  console.log(token);
  if (token !== null) {
    parsed = parseJwt(token);
    console.log(parsed);
  }
  // const parsed = parseJwt(token);
  // console.log(parsed);

  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      {token !== null && parsed.role === "admin" && (
        <div>
          |&nbsp;
          <Link className="Link" to="/users">
            Users
          </Link>
        </div>
      )}
      <div>|</div>
      <Link className="Link" to="/about">
        About
      </Link>
      {token === null && (
        <div>
          |&nbsp;
          <Link className="Link" to="/Login">
            Login
          </Link>
        </div>
      )}
      {token !== null && (
        <div>
          |&nbsp;
          <Link className="Link" to="/userspace">
            Personal Space
          </Link>
          &nbsp;|&nbsp;
          <Link
            className="Link"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = `/`;
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
