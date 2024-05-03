import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

import "./AdminDashboard.css";

function ListContact() {
  const [messageContacts, setMessageContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restaurant-backend-1-ixbn.onrender.com/messageqna", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch message contact");
        }

        const data = await response.json();
        setMessageContacts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching message contact:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteMessageContact = async (messageId) => {
    try {
      const response = await fetch(
        `https://restaurant-backend-1-ixbn.onrender.com/messageqna/${messageId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete message contact");
      }

      setMessageContacts((prevMessageContacts) =>
        prevMessageContacts.filter(
          (messageContact) => messageContact._id !== messageId
        )
      );

      alert("Message contact deleted successfully");
    } catch (error) {
      console.error("Error deleting message contact:", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-center mb-4">Contact Us List</h2>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>Message Id</th>
                <th>Date and Time</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messageContacts.map((messageContact) => (
                <tr key={messageContact._id}>
                  <td>{messageContact._id}</td>
                  <td>
                    {new Date(messageContact.timestamp).toLocaleString([], {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>

                  <td>{messageContact.name}</td>
                  <td>{messageContact.email}</td>
                  <td>{messageContact.subject}</td>
                  <td>{messageContact.message}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteMessageContact(messageContact._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ListContact;
