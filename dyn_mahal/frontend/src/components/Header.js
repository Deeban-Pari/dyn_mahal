import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Body from "./Body";
import { Modal } from "react-bootstrap";
import Auth from "./Auth";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userEmail,setUserEmail] = useState("");

  useEffect(()=>{
    const token=localStorage.getItem('token');
    const email=localStorage.getItem('email');

    if(token){
      setIsLoggedIn(true);
    }
    if(email){
      setUserEmail(email)
    }
  },[]);

  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserEmail("");
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAuthSuccess = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setShowModal(false); // Close modal
  };

  return (
    <div>
      {/* ---Header--- */}
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ background: "#479761" }}
      >
        <div className="container-fluid">
          {/* Logo Section */}
          <a
            className="navbar-brand d-flex align-items-center me-auto text-nowrap"
            href="/"
            style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}
          >
            <i className="bi bi-flower2 me-2"></i> MyLogo
          </a>

          {/* Navbar Toggler for Mobile View */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Navigation Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item mx-2">
                <a
                  className="nav-link text-nowrap active"
                  aria-current="page"
                  href="/"
                >
                  <i className="bi bi-house-fill me-1"></i> Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-nowrap" href="#">
                  <i className="bi bi-bank me-1"></i> Book Mahal
                </a>
              </li>
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link dropdown-toggle text-nowrap"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-list-check me-1"></i> Type of Services
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Book Cook
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Book Decorations
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Book Helpers
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Book DJ
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Book Cabs
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Book Bouncers
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-nowrap" href="#">
                  <i className="bi bi-receipt me-1"></i> EB Bill
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-nowrap" href="#">
                  <i className="bi bi-download me-1"></i> Receipt Download
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-nowrap" href="#">
                  <i className="bi bi-cash-coin me-1"></i> Refund/Transaction Status
                </a>
              </li>
               {/* Welcome Message with Conditional Truncation */}
               {isLoggedIn ? (
  <>
    {/* Welcome Message */}
    <li className="nav-item me-2">
      <span style={{cursor:"pointer"}}
        className="nav-link text-nowrap text-white"
        title={"Welcome " +userEmail}
      >
        Welcome {userEmail.length > 7 ? `${userEmail.slice(0, 7)}...` : userEmail}
      </span>
    </li>

    {/* Profile Dropdown */}
    <li className="nav-item">
      <div className="dropdown show d-flex align-items-center">
        <div
          className="dropdown-toggle mt-2"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ color: "white" }}
        >
          <i className="bi bi-person-fill"></i>
        </div>
        <ul
          className="dropdown-menu dropdown-menu-start"
          style={{ left: "-120px" }}
        >
          <li>
            <a className="dropdown-item" href="#">
              <i className="bi bi-person-lines-fill"></i> My Profile
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </a>
          </li>
        </ul>
      </div>
    </li>
  </>
) : (
  /* Login / Signup */
  <li className="nav-item mx-2">
    <span
      className="nav-link text-nowrap"
      style={{ cursor: "pointer" }}
      onClick={handleOpenModal}
    >
      <i className="bi bi-box-arrow-in-right me-1"></i> Login / Signup
    </span>
  </li>
)}

            </ul>
          </div>
        </div>
      </nav>

      {/* Login/Signup Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login / Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{marginLeft:"35px"}}>
          <Auth onAuthSuccess={handleAuthSuccess}/>
          </div>
        </Modal.Body>
      </Modal>
      <Body />
    </div>
  );
};

export default Header;
