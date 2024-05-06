import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SliderItem from "./SliderItem.jsx";

// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./Slider.css";
import { Link } from "react-router-dom";
function Slider() {
  const images = [
    { id: 1, src: "../../../public/assets/images/slider-4.png", alt: "Image 1" },
    { id: 2, src: "../../../public/assets/images/slider-5.png", alt: "Image 2" },
    { id: 3, src: "../../../public/assets/images/slider-4.png", alt: "Image 3" },
  ];

  return (
    <>
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image.id}>
            <SliderItem src={image.src} alt={image.alt} />
            <Carousel.Caption>
              <Link to="/Menu">
              <button className="order-btn">
                Order Now ...
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginLeft: "5px" }}
                />
              </button>
              </Link>
              
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default Slider;
