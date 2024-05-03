
import Slider from "react-slick";
import starImage1 from "../../assets/images/stars-1.svg";
import starImage3 from "../../assets/images/stars-3.svg";
import starImage4 from "../../assets/images/stars-4.svg";
import starImage5 from "../../assets/images/stars-5.svg";
import profileImage from "../../assets/images/profile.png";
import profileImage2 from "../../assets/images/profile2.png";
import profileImage3 from "../../assets/images/profile3.png";
import profileImage4 from "../../assets/images/profile4.png";
import "./TrustPilot.css";

import { Container, Card, Image } from "react-bootstrap";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#ffffff00" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#ffffff00" }}
            onClick={onClick}
        />
    );
}

function TrustPilot() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
         responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 913,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },

            {
                breakpoint: 912,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ]
    };
    return (
        <Container className="slider-container" fluid>
            <Slider {...settings}>
                <div>
                <Card className="comment-container">
                    <Card.Body className="card-body-trust">
                        <p>3 hours ago</p>
                        <div className="image-container">
                            <Image src={profileImage2} alt="profile" className="profile" fluid />
                            <Image src={starImage1} alt="rate Star" className="star" fluid />
                        </div>
                        <Card.Title>Lorraine Strawson</Card.Title>
                        <Card.Text>“Received substitute box of vapes after my ordered product was out of stock! So take payment first then go and check. I hope that sending this parcel back is go...”</Card.Text>
                    </Card.Body>
                </Card>
                </div>

                <div>
                <Card className="comment-container">
                    <Card.Body className="card-body-trust">
                        <p>4 days ago</p>
                        <div className="image-container">
                            <Image src={profileImage} alt="profile" className="profile" fluid />
                            <Image src={starImage5} alt="rate Star" className="star" fluid />
                        </div>
                        <Card.Title>Simon Grimley</Card.Title>
                        <Card.Text>“I ordered a Shower Suite from Bella Bathrooms having called them to discuss the unusual sizes I needed. They provided me with good advice and offered a few opti...”</Card.Text>
                    </Card.Body>
                </Card>
                </div>

                <div>
                <Card className="comment-container">
                    <Card.Body className="card-body-trust">
                        <p>5 hours ago</p>
                        <div className="image-container">
                            <Image src={profileImage3} alt="profile" className="profile" fluid />
                            <Image src={starImage3} alt="rate Star" className="star" fluid />
                        </div>
                        <Card.Title>Gor Mkhitarian</Card.Title>
                        <Card.Text>Margaret Negus reviewed ChemistDirect.co.uk “Rapid service Reasonably priced products”</Card.Text>
                    </Card.Body>
                </Card>
                </div>


                <div>
                <Card className="comment-container">
                    <Card.Body className="card-body-trust">
                        <p>2 days ago</p>
                        <div className="image-container">
                            <Image src={profileImage} alt="profile" className="profile" fluid />
                            <Image src={starImage4} alt="rate Star" className="star" fluid />
                        </div>
                        <Card.Title>Keith Martin</Card.Title>
                        <Card.Text>“Easy to renew and the price didn't change.”</Card.Text>
                    </Card.Body>
                </Card>
                </div>


                <div>
                <Card className="comment-container">
                    <Card.Body className="card-body-trust">
                        <p>11 hours ago</p>
                        <div className="image-container">
                            <Image src={profileImage4} alt="profile" className="profile" fluid />
                            <Image src={starImage5} alt="rate Star" className="star" fluid />
                        </div>
                        <Card.Title>Joanna Michalska</Card.Title>
                        <Card.Text>“I use Simply Clinics few years now for all my beauty treatments. One of my favourite beautician to go to in Mona who is always very precise and remembers all my...”</Card.Text>
                    </Card.Body>
                </Card>
                </div>
                
            </Slider>
        </Container>

    );
}

export default TrustPilot;
