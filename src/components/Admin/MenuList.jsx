
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';

//Import Components
import MenuEditModal from "./MenuEditModal.jsx";
import MenuCreateModal from "./MenuCreateModal.jsx";

//Import CSS
import './AdminDashboard.css'

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [menuData, setMenuData] = useState({
    _id: "",
    title: "",
    description: "",
    price: "",
  });
  const [newMenuData, setNewMenuData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await fetch("https://restaurant-backend-ccgs.onrender.com/menu/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Menu List Admin");
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  const handleDelete = async (menuId) => {
    try {
      const response = await fetch(`https://restaurant-backend-ccgs.onrender.com/menu/${menuId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete menu with ID ${menuId}`);
      }

      setMenus((prevMenus) => prevMenus.filter((menu) => menu._id !== menuId));
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const handleEdit = (menuId) => {
    const selectedMenu = menus.find((menu) => menu._id === menuId);
    if (selectedMenu) {
      setMenuData(selectedMenu);
      setShowModal(true);
    } else {
      console.error(`Menu with ID ${menuId} not found.`);
    }
  };

  const handleUpdate = async (updatedMenuData) => {
    try {
      const response = await fetch(
        `https://restaurant-backend-ccgs.onrender.com/menu/${updatedMenuData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedMenuData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Update menu");
      }

      fetchMenus();
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const handleCreate = () => {
    setShowModalCreate(true);
  };

  const menuCreate = async (formData) => {
    try {
      const formDataWithPicture = new FormData();
      formDataWithPicture.append("title", formData.title);
      formDataWithPicture.append("description", formData.description);
      formDataWithPicture.append("price", formData.price);
      formDataWithPicture.append("type", formData.type);
      formDataWithPicture.append("picture", formData.picture);

      const response = await fetch(
        "https://restaurant-backend-ccgs.onrender.com/menu/uploadmenu",
        {
          method: "POST",
          body: formDataWithPicture,
          credentials: "include",
        }
      );

      if (response.ok) {
        setShowModalCreate(false);
        fetchMenus();

      } else {
        console.error("Failed to create menu item");
      }
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  return (
    <>
      <div className="p-5">
        <h2 className="text-center mb-4">Menu List</h2>
        <button
          onClick={() => handleCreate(newMenuData)}
          className="btn btn-success button-admin-menu"
        >
          Create New Menu
        </button>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>Picture</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu._id}>
                  <td>
                    <img
                      src={menu.picture}
                      alt={menu.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{menu.title}</td>
                  <td>{menu.description}</td>
                  <td>{menu.price}</td>
                  <td className="button-container-menuadmin">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => handleEdit(menu._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(menu._id)}
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
      <MenuEditModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onUpdateMenuData={handleUpdate}
        menuData={menuData}
      />
      <MenuCreateModal
        isOpen={showModalCreate}
        onRequestClose={() => setShowModalCreate(false)}
        onCreateMenuData={menuCreate}
        newMenuData={newMenuData}
      />
    </>
  );
}

export default MenuList;
