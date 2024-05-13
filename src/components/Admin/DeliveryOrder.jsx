import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import "./AdminDashboard.css";

function AdminDeliveryOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restaurant-backend-ccgs.onrender.com/deliveryorder/adminorder",
          { credentials: "include" }
        );
        const data = await response.json();
        setOrders(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching orders in admin dashboard:", error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `https://restaurant-backend-ccgs.onrender.com/deliveryorder/adminorderupdate/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      // console.log(data);

      const updatedOrderStatus = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, status: newStatus };
        }

        return order;
      });

      setOrders(updatedOrderStatus);
      window.alert("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const StatusDropdown = ({ orderId, currentStatus }) => (
    <select
      value={currentStatus}
      onChange={(e) => handleStatusChange(orderId, e.target.value)}
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="delivered">Delivered</option>
    </select>
  );

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `https://restaurant-backend-ccgs.onrender.com/deliveryorder/adminorderdelete/${orderId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      const updatedOrders = orders.filter((order) => order._id !== orderId);

      setOrders(updatedOrders);
      alert("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Admin List Orders</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Address</th>
              <th>Status</th>
              <th>Time Order</th>
              <th>Total Price</th>
              <th>Quantity</th>
              <th>Menu List</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              ({
                _id,
                user,
                status,
                time,
                price,
                quantity,
                menus,
                address,
              }) => (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{user ? user.username : 'Unknown User'}</td>
                  <td>{address}</td>
                  <td
                    style={{
                      backgroundColor:
                        status === "delivered"
                          ? "yellow"
                          : status === "confirmed"
                            ? "green"
                            : "inherit",
                    }}
                  >
                    <StatusDropdown orderId={_id} currentStatus={status} />
                  </td>
                  <td>{new Date(time).toLocaleString()}</td>
                  <td>{price}</td>
                  <td>{quantity}</td>
                  <td>
                    {menus.map(({ _id, title }) => (
                      <ul key={_id}>
                        <li>{title}</li>
                      </ul>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteOrder(_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AdminDeliveryOrder;
