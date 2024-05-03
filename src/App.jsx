import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Import React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

//Import Components
import Navagation from "./components/Navigation/NavigationComponent.jsx";
import Home from "./components/Home/HomeComponent.jsx";
import Menu from "./components/Menu/MenuComponent.jsx";
import AboutUsMore from "./components/AboutUs/AboutUsMore.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import Cart from "./components/Cart/CartComponent.jsx";
import Reservation from "./components/Reservation/Reservation.jsx";

//Import Context
import UserContext from "./components/context/UserContext.jsx";
import CartContext from "./components/context/CartContext.jsx"
import MenuContext from "./components/context/MenuContext.jsx"
import Basket from "./components/Basket/Basket.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

import ProfileUser from "./components/ProfileUser/ProfileUser.jsx";
import Payment from "./components/Payment/Payment.jsx";

//Import Preloader
import PreloaderComponent from "./components/PreloaderComponent/PreloaderComponent.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const [deletedItem, setDeletedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [groupedItems, setGroupedItems] = useState({});

  //Preload
  const [showPreloader, setShowPreloader] = useState(true);


  useEffect(() => {
    // Fetch user role when user logs in
    const fetchUserRole = async () => {
      try {
        const response = await fetch("https://restaurant-backend-1-ixbn.onrender.com/users/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true)
          setUserRole(userData.role);
          if (userData.role === "admin") {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
          }
          console.log(userData.role);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserRole();
  }, [isLoggedIn, isAdmin]);

  const addItemToCart = (item) => {
    if (item && item._id) {
      setCartItems([...cartItems, item]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
    } else {
      console.error('Item does not have a valid _id:', item);
    }
  };


  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);


  useEffect(() => {
    if (deletedItem) {
      console.log("Deleted Item:", deletedItem);
    }
  }, [deletedItem]);

  const removeItemFromCart = (itemId) => {
    const itemIndex = cartItems.findIndex(item => item && item._id === itemId);
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems.slice(0, itemIndex), ...cartItems.slice(itemIndex + 1)];
      setCartItems(updatedCartItems);

      // Update localStorage with the updated cartItems
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };
  useEffect(() => {
    // Group items by their unique id
    const groupedItems = cartItems.reduce((groups, item) => {
      if (item && item._id) {
        if (!groups[item._id]) {
          groups[item._id] = { ...item, count: 0 };
        }
        groups[item._id].count++;
      }
      return groups;
    }, {});
    setGroupedItems(groupedItems);
  }, [cartItems]);



  const emptyCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  //Preload
  useEffect(() => {
    const preloadTimeout = setTimeout(() => {
      setShowPreloader(false);
    }, 500);
    return () => clearTimeout(preloadTimeout);
  }, []);

  return (
    <>
    {showPreloader && <PreloaderComponent />}
    {!showPreloader && (
      <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, username, setUsername, userRole, setUserRole, isAdmin, setIsAdmin }}
    >
      <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, deletedItem, emptyCart, groupedItems }}>
        <MenuContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
          <BrowserRouter>
            <Routes>
              <Route path="/Navigation" element={<Navagation />} />
              <Route index element={<Home />} />
              <Route path="/Menu" element={<Menu />} />
              <Route path="/Aboutus" element={<AboutUsMore />} />
              <Route path="/Contactus" element={<ContactUs />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Reservation" element={<Reservation />} />
              <Route path="/Profileuser" element={<ProfileUser />} />
              <Route path="/Basket" element={<Basket />} />
              <Route path="/Admin" element={<AdminDashboard />} />
              <Route path="/Payment" element={<Payment />} />
            </Routes>
          </BrowserRouter>
        </MenuContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
      
    )}
    
    </>
  );
}

export default App;

