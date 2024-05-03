import React, { useContext, useEffect } from "react";
import { FaPhone, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

// Import Components
import Cart from "../Cart/CartComponent.jsx";
import Login from "../Login/LoginComponent.jsx";
import LogOutModal from "../Modals/LogOutModal.jsx";

// Import Context
import UserContext from "../../components/context/UserContext.jsx";

// Import CSS
import "./Nav.css";

// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Container, Navbar } from "react-bootstrap";
import Register from "../Register/RegisterComponent.jsx";

import CartContext from "../context/CartContext.jsx";

function Navigation() {
  const { cartItems } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { username, setUsername, userRole, setUserRole } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  console.log("isAdmin:", isAdmin);
  console.log("userRole:", userRole);

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username");

    setIsLoggedIn(isLoggedInStorage);

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setIsLoggedIn, setUsername, userRole]);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("role");
    setIsAdmin(storedUserRole === "admin");
  }, [userRole]);



  // Ensure this runs when the relevant local storage values change
  useEffect(() => {
    const storedUserRole = localStorage.getItem("role");
    setIsAdmin(storedUserRole === "admin");
  }, [localStorage.getItem("role")]);



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalLogin = () => {
    setIsModalLogin(true);
  };

  const openModelLogOut = () => {
    setShowLogoutModal(true);
  };

  const closeModalLogin = () => {
    setIsModalLogin(false);
  };

  const openModalRegister = () => {
    setIsModalRegister(true);
  };

  const closeModalRegister = () => {
    setIsModalRegister(false);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
          <div className="basket-cart">
            <FontAwesomeIcon
              size={20}
              onClick={openModal}
              icon={faShoppingCart}
              style={{ marginLeft: "5px" }}
            />
            <div className="cart-badge">{cartItems.length}</div>
          </div>
          <div className="phone-nav">
            <FaPhone />
            <a href="tel:+491234567890" className="phone">+49 123 4567 890</a>
          </div>


          <div className="button">
            {isLoggedIn ? (
              <>
                <span className="username">Hi, {username}! </span>
                <button className="logOut" onClick={openModelLogOut}>
                  Logout
                </button>
                {isAdmin && (
                  <Link to="/Admin">
                    <button variant="secondary">Dashboard</button>
                  </Link>
                )}
                {!isAdmin && (
                  <Link to="/Profileuser">
                    <button variant="secondary">Profile User</button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <button onClick={openModalLogin}>Login</button>
                <button onClick={openModalRegister}>Register</button>
              </>
            )}
          </div>
      
        <Cart isOpen={isModalOpen} onRequestClose={closeModal} />
        <Login
          isOpenLogin={isModalLogin}
          onRequestClose={closeModalLogin}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
        />
        <LogOutModal
          isOpen={showLogoutModal}
          onRequestClose={() => setShowLogoutModal(false)}
          setIsLoggedIn={setIsLoggedIn}
          setShowLogoutModal={setShowLogoutModal}
        />
        <Register
          isOpenRegister={isModalRegister}
          onRequestClose={closeModalRegister}
        />
      </Container>
    </Navbar>
  );
}

export default Navigation;
