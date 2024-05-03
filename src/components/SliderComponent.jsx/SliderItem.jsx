import React from "react";

import "./Slider.css";
function SliderItem({ src, alt }) {
  return <img className="d-block w-100" src={src} alt={alt} />;
}

export default SliderItem;
