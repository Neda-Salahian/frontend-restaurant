import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ProfileEditModal = ({
  isOpen,
  onRequestClose,
  profileData,
  onUpdateProfile,
}) => {
  // const [formData, setFormData] = useState({
  //   username: profileData?.username || "",
  //   firstname: profileData?.firstname || "",
  //   lastname: profileData?.lastname || "",
  //   email: profileData?.email || "",
  //   address: profileData?.address || "",
  //   phonenumber: profileData?.phonenumber || "",
  // });

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");


  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Reset updateSuccess and error after closing the modal
  //   if (!isOpen) {
  //     setUpdateSuccess(false);
  //     setError(null);
  //   }
  // }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      setUsername(profileData.username);
      setFirstname(profileData.firstname);
      setLastname(profileData.lastname);
      setEmail(profileData.email);
      setAddress(profileData.address);
      setPhonenumber(profileData.phonenumber);
    }
  }, [isOpen, profileData]);


  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfileData = {
      _id: profileData._id,
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      address: address,
      phonenumber: phonenumber,
    };
    onUpdateProfile(updatedProfileData);
    onRequestClose();
  };


  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setIsLoading(true);

  //   try {
  //     await onUpdateProfile(formData);

  //     await fetch("https://restaurant-backend-1-ixbn.onrender.com/users/updateprofile", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(formData),
  //     });

  //     // Update profileData prop to trigger re-rendering
  //     onUpdateProfile(formData);

  //     setUpdateSuccess(true);
  //     setError(null);

  //     // Close the modal after a short delay to allow users to see the success message
  //     setTimeout(() => {
  //       onRequestClose();
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {updateSuccess && (
          <div className="alert alert-success" role="alert">
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            Error updating profile: {error}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </Form.Group>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group controlId="phonenumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}

            />
          </Form.Group>
          <Button variant="primary" type="submit"  className="mt-3">
            Save Change
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileEditModal;