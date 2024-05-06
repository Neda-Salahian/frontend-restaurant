import { useState, useEffect } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import Navigation from "../Navigation/NavigationComponent.jsx";
import Header from "../Header/HeaderComponent.jsx";
import Footer from "../Footer/Footer.jsx";
import ProfileEditModal from "./ProfileEditModal.jsx";
<<<<<<< HEAD
=======
import { Container, Row, Button, Col } from "react-bootstrap";


// Import CSS
>>>>>>> 3bfd3127a626b652c7e6cfa92341044be911cba7
import "./ProfileUser.css";

const ProfileUser = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://restaurant-backend-ccgs.onrender.com/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const response = await fetch(
        "https://restaurant-backend-ccgs.onrender.com/users/updateprofile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setProfileData(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };

  const fetchUserOrder = async () => {
    try {
      const response = await fetch(
        "https://restaurant-backend-ccgs.onrender.com/deliveryorder/userorder",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user order");
      }

      const data = await response.json();
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user order:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUserOrder();
  }, []);

  return (
    <>
      <Navigation />
      <Header />
      <Container fluid className="profile-section">
        <Row className="contact-section-title">
          <div>
            <h3>Profile User </h3>
          </div>
        </Row>
        <Row className="g-2 form-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : profileData ? (
            <>
              <p>Username: {profileData.username}</p>
              <p>First Name: {profileData.firstname}</p>
              <p>Last Name: {profileData.lastname}</p>
              <p>Email : {profileData.email}</p>
              <p>Address : {profileData.address}</p>
              <p>Phone : {profileData.phonenumber}</p>
              <Col md={6}>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Edit
                </Button>
              </Col>
            </>
          ) : (
            <p>No profile data available</p>
          )}
        </Row>

        <Row>
  <div>
    <h3>User Orders</h3>
    {orders.map((order, index) => (
      <div key={index} className="order-item">
        <p>Order ID: {order._id}</p>
        <p>Time order : {order.time}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Price: ${order.price}</p>
        <p>Ordered Menus:</p>
        <ul>
          {order.menus.map((menu, menuIndex) => (
            <li key={menuIndex}>{menu.title}</li>
          ))}
        </ul>
        {/* Add more order details if needed */}
      </div>
    ))}
  </div>
</Row>

      </Container>

      <Footer />

      <ProfileEditModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        profileData={profileData}
        onUpdateProfile={handleUpdateProfile}
      />
    </>
  );
};

export default ProfileUser;
