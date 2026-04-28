import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar" >
      <h2>Task Manager</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
}

export default Navbar;