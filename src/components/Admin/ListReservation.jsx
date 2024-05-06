import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import "./AdminDashboard.css";

const ListReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("https://restaurant-backend-ccgs.onrender.com/reservations", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        // console.log(data);
        setReservations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `https://restaurant-backend-ccgs.onrender.com/reservations/${reservationId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }

      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation._id !== reservationId
        )
      );

      alert("Reservation deleted successfully");
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Dashboard - Reservations</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Reservation Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number of Guests</th>
              <th>Date</th>
              <th>Time</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation._id}</td>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.numberOfGuests}</td>
                <td>{reservation.calendar}</td>
                <td>{`${reservation.time} PM`}</td>
                <td>{reservation.message}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteReservation(reservation._id)}
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
  );
};

export default ListReservation;
