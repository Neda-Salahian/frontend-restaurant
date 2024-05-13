import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Container, Row, Button } from "react-bootstrap"; // Import necessary components from React Bootstrap
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import Pagination from 'react-bootstrap/Pagination';

import Navigation from "../Navigation/NavigationComponent";
import Header from "../Header/HeaderComponent";
import Footer from "../Footer/Footer";

//Spinner
import Spinner from 'react-bootstrap/Spinner';
import BeatLoader from "react-spinners/BeatLoader";


//Import Context
import CartContext from "../context/CartContext.jsx";

import "./Menu.css";

function Menu() {
  const {addItemToCart} = useContext(CartContext);
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [menusPerPage] = useState(8);
  //Spinner
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("https://restaurant-backend-ccgs.onrender.com/menu");
        setMenus(response.data);
        const spinnerTimeout = setTimeout(() => {
          setLoading(false);
        }, 500);
        return () => clearTimeout(spinnerTimeout);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

 

   // Get current menus
   const indexOfLastMenu = currentPage * menusPerPage;
   const indexOfFirstMenu = indexOfLastMenu - menusPerPage;
   const currentMenus = menus.slice(indexOfFirstMenu, indexOfLastMenu);
 
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navigation />
      <Header />
      <Container fluid className="menu-container">
        <Row className="about-section-title">
          <div>
            <h3>Menu Sushi House</h3>
          </div>
        </Row>
        <Row className="g-4 about-card-container mt-3 justify-content-center menu-row">
          {currentMenus.map((menu) => (
            <Card style={{ width: "20rem" }} key={menu._id} className="card-menu-style">
             {loading && ( 
                 <BeatLoader
                  color="#AB2626"
                  
                  className="beatloader"
                  />
                )}
                 {!loading && ( 
                <Card.Img
                  src={menu.picture}
                  className="card-img-top"
                  alt={menu.title}
                  style={{ height: "200px", objectFit: "cover" }}
                  variant="top"
                />
            )}
               
            
              <Card.Body>
                <Card.Title>{menu.title}</Card.Title>
                <Card.Text>{menu.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Price: {menu.price}€</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Button onClick={() => addItemToCart(menu)}>
                  Add To Basket
                </Button>
               
              </Card.Body>
            </Card>
          ))}
          {/* Pagination */}
         <div className="pagination-container">
          <Pagination>
            {Array.from({ length: Math.ceil(menus.length / menusPerPage) }).map(
              (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Menu;
