import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo1.png";
import "./Navbar.css";
function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return (
        <header className={sticky ? "sticky" : ""}>
            <div className="container">
                <div className="navbar">
                <div className="logo">
                   <a href="#"><img src={logo} alt="Food Lovers" /></a>
                </div>
                <nav className={menuOpen ? "active" : ""}>
                  <div className="btn">
              <FaTimes
                className="close-btn"
                onClick={() => setMenuOpen(false)}
              />
            </div>
               <ul>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/about">About</NavLink></li>
  <li><NavLink to="/menu">Menu</NavLink></li>
  <li><NavLink to="/reservation">Reservation</NavLink></li>
  <li><NavLink to="/blog">Blog</NavLink></li>
  <li><NavLink to="/contact">Contact</NavLink></li>
</ul>
        </nav>
         <div className="btn">
            <FaBars
              className="menu-btn"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
            </div>
        </header>
        
    );
}
export default Navbar;