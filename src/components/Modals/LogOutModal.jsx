import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import "./LogOutModal.css";

function LogOutModal({
  isOpen,
  onRequestClose,
  setIsLoggedIn,
  setShowLogoutModal,
}) {
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    console.log("Attempting to logout...");
    try {
      const response = await fetch("https://restaurant-backend-1-ixbn.onrender.com/users/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Failed to log out.");
      } else {
        console.log("Successfully logged out.");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setShowLogoutModal(false);
        localStorage.removeItem("role");
        navigateTo("/");
        
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logout Modal"
      className="custom-modal-logout"
      overlayClassName="custom-overlay-logout"
    >
      <h3>Logout Confirmation</h3>
      <div className="logout-buttons">
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Modal>
  );
}

export default LogOutModal;
