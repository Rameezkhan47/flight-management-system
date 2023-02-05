import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ user }) => {
  const navigate = useNavigate()

  console.log("user is", user);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  const navigateReservation = () => {
    navigate('reservations')
  }
  const navigateFlight = () => {
    navigate('flights')
  }
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          <ul>Airline Management System{" "}</ul>
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem"></li>
          <li className="listItem">{user.username}</li>
          <li className="listItem" onClick={navigateFlight}>Flights</li>
          <li className="listItem" onClick={navigateReservation}>Reservations</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
