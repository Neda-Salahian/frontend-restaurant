//Import React
import { useState, useEffect, useContext } from "react";
import axios from "axios";

// Import Component
import Navigation from "../Navigation/NavigationComponent.jsx";
import Header from "../Header/HeaderComponent.jsx";
import Footer from "../Footer/Footer.jsx";
import ProfileEditModal from "./ProfileEditModal.jsx";
import { Container, Row, Button, Col } from "react-bootstrap";


// Import CSS
import "./ProfileUser.css";

const ProfileUser = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  // const handleUpdateUserData = (updatedUserData) => {
  //   setUserData(updatedUserData);
  // };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://restaurant-backend-ccgs.onrender.com/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

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
      const response = await fetch("https://restaurant-backend-ccgs.onrender.com/users/updateprofile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setProfileData(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };



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