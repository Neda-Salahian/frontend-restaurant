//Import React
import React from "react";
import { useContext } from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Import Components
import SuccessModal from "./SuccessModal";

import UserContext from "../context/UserContext";

//Import CSS
import "./Login.css";
function Login({ isOpenLogin, onRequestClose, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin}) {
  const [username, setUsername] = useState("");
  
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]); 
  const navigateTo = useNavigate();

  const { setUsername: setContextUsername } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      setUsername("");
      setPassword("");
      setError(false); 
    }
  }, [isLoggedIn]);
  // const { setRole: setContextRole } = useContext(UserContext);

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedInStorage);

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch users when the component mounts
    fetchUsers();
  }, [setIsLoggedIn, setUsername]);

 
  

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://restaurant-backend-ccgs.onrender.com/users");
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
        // console.log("Users fetched:", userData);
        setPassword("");
        setUsername("");
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("https://restaurant-backend-ccgs.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", 
      });

      if (response.ok) {
        const userData = await response.json();
        // console.log(userData);
        setIsLoggedIn(true);
        setContextUsername(username);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        localStorage.setItem("role", userData.user.role);
        // console.log(userData.user.role)
        setShowSuccessModal(true);
        if(userData.user.role === "admin"){
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(true);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <Modal
          isOpen={isOpenLogin}
          onRequestClose={onRequestClose}
          contentLabel="Login"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="success-header">
            <h3>Enter Your Username and Password</h3>
            <button onClick={onRequestClose}>X</button>
          </div>

          {error && (
            <p className="error-message">Invalid username or password</p>
          )}
          <form className="form-group" onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </Modal>
      ) : (
        <SuccessModal
          isOpen={showSuccessModal}
          onRequestClose={() => {
            setShowSuccessModal(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}

export default Login;
