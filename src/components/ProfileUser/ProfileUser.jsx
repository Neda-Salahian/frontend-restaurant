import { useState, useEffect } from "react";
import { Container, Row, Button, Col, Card, ListGroup } from "react-bootstrap";
import Navigation from "../Navigation/NavigationComponent.jsx";
import Header from "../Header/HeaderComponent.jsx";
import Footer from "../Footer/Footer.jsx";
import ProfileEditModal from "./ProfileEditModal.jsx";

import { format } from 'date-fns';

// Import CSS
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


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss'); // فرمت مورد نظر شما
  };

  return (
    <>
      <Navigation />
      <Header />
      <Container fluid className="profile-section">
        <Row className="profile-section-title">
          <div>
            <h3>Profile User </h3>
          </div>
        </Row>
        <Row style={{ margin: "10px" }}>
          <Col md={12} className="profile-container">
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
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Edit
                </Button>
              </>
            ) : (
              <p>No profile data available</p>
            )}
          </Col>
        </Row>



        <Row>
          <Col md={12}>
            <Row className="order-container">
              <h3 className="mt-3">Order History</h3>
              {orders.map((order, index) => (
                <Col md={6} lg={4} key={index} className="mb-3"> {/* ستون با اندازه md */}
                  <Card className="card-menu-style">
                    <Card.Body>
                      <Card.Title>Order ID: {order._id}</Card.Title>
                      <Card.Text>Time order : {formatDate(order.time)}</Card.Text>
                      <Card.Text>Quantity: {order.quantity}</Card.Text>
                      <Card.Text>Price: ${order.price.toFixed(2)}</Card.Text>
                      <p>Ordered Menus:</p>
                      <ul>
                        {order.menus.map((menu, menuIndex) => (
                          <li key={menuIndex}>{menu.title}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              ))}

            </Row>
          </Col>
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
