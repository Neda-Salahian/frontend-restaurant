//Import React
import  { useState, useEffect } from "react";
import Modal from "react-modal";
import { Container, Row, Col } from "react-bootstrap";
//Import Components
import SuccessRegisterModal from "./SuccessRegisterModal.jsx";
//Import CSS
import "./Register.css";

function Register({ isOpenRegister, onRequestClose }) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://restaurant-backend-1-ixbn.onrender.com/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, [])

const handleRegister = async (e) => {
  e.preventDefault();

  if (
    username.trim() === "" ||
    firstname.trim() === "" ||
    lastname.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    alert("Please enter username and password");
    return;
  }

  const existingUser = users.find((user) => user.email === email || user.username === username);
  if (existingUser) {
    alert("User already exists");
    return;
  }

  const newUser = { username, firstname, lastname, email, password };

  try {
    const response = await fetch("https://restaurant-backend-1-ixbn.onrender.com/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();

    // console.log("User registered successfully:", data);
    setRegistered(true);
    setShowSuccessModal(true);
  } catch (error) {
    console.error("Error registering user:", error);
  
    alert("Failed to register user. Please try again later.");
  }
};


  return (
    <>
    
        {registered ? (
          <SuccessRegisterModal
            isOpen={showSuccessModal}
            onRequestClose={() => setShowSuccessModal(false)}
          />
        ) : (
          <Modal
            isOpen={isOpenRegister}
            onRequestClose={onRequestClose}
            contentLabel="Register"
            className="custom-modal"
            overlayClassName="custom-overlay"
          >
            <div className="success-header">
              <h3>SignUp!</h3>
              <button onClick={onRequestClose}>X</button>
            </div>

            {error && (
              <p className="error-message">
                Please enter username and password
              </p>
            )}
            <Container>
              <form className="form-group" onSubmit={handleRegister}>
                <Row>
                  <Col md={6}>
                    <label>Username:</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <label>Firstname:</label>
                    <input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <label>LastName:</label>
                    <input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>

                  <Col md={6}>
                    <label>Email:</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>

                  <Col md={6}>
                    <label>Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <button type="submit">Register</button>
                </Row>
              </form>
            </Container>
          </Modal>
        )}
  
    </>
  );
}

export default Register;
