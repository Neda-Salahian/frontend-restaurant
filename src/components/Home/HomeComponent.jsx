//Import React
import { useState, useEffect } from "react";
//Import Components
import Navagation from "../Navigation/NavigationComponent.jsx";
import Header from "../Header/HeaderComponent.jsx";
import Slider from "../SliderComponent.jsx/Slider.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";
import Footer from "../Footer/Footer.jsx";
import Feature from "../Feature/Feature.jsx";
import TrustPilot from "../TrustPilot/TrustPilot.jsx"

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedInStorage);

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setIsLoggedIn, setUsername]);

  return (
    <>
      <Navagation
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
        setUsername={setUsername}
      />
      <Header />
      <Slider />
      <AboutUs />
      <Feature />
      <TrustPilot /> 
      <Footer />
    </>
  );
}

export default Home;
