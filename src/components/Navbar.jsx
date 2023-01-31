import { Link } from "react-router-dom";
 
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
    <div className="container">
      <a href="#" className="navbar-brand">Blog Application</a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navmenu">
        <ul className="navbar-nav ms-auto">
          
        <li className="nav-item">
           <Link to="/Newblog" className="nav-link">Add Blog</Link>
        </li>
          <li className="nav-item">
           <Link to="/Signup" className="nav-link">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/Login" className="nav-link">Login</Link>
          </li> 
          <li className="nav-item">
            <Link to="" className="nav-link">Logout</Link>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  );
}
 
export default Navbar;