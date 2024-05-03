import Header from "../Header/HeaderComponent"
import Navigation from "../Navigation/NavigationComponent"

//Import Bootstrap
import { Container, Row, Accordion } from "react-bootstrap"

//Import Components
import UserList from "./UserList.jsx"
import ListContact from "./ListContact.jsx"
import MenuList from "./MenuList.jsx"
import AdminDeliveryOrder from "./DeliveryOrder.jsx"
//Import CSS
import "./AdminDashboard.css"
import ListReservation from "./ListReservation.jsx"



function AdminDashboard() {
  return (
    <>
      <Navigation />
      <Header />
      <Container fluid>
        <Row className="admin-section-title">
          <div>
            <h3>Admin Dashboard</h3>
          </div>
        </Row>

        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Manage Users</Accordion.Header>
            <Accordion.Body>
              <UserList />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Manage Message Contact</Accordion.Header>
            <Accordion.Body>
              <ListContact/>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Manage Message Reservation</Accordion.Header>
            <Accordion.Body>
              <ListReservation/>
            </Accordion.Body>
          </Accordion.Item>


          <Accordion.Item eventKey="3">
            <Accordion.Header>Manage orders</Accordion.Header>
            <Accordion.Body>
              <AdminDeliveryOrder/>
            </Accordion.Body>
          </Accordion.Item>


          <Accordion.Item eventKey="4">
            <Accordion.Header>Food menu management</Accordion.Header>
            <Accordion.Body>
              <MenuList/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </Container>

    </>
  )
}

export default AdminDashboard