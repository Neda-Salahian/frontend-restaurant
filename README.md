# Restaurant Sushi House - MERN Stack Fullstack Final Project

Sushi House is a full-stack web application built with the MERN (MongoDB, Express.js, React, Node.js) stack, aimed at providing a seamless experience for managing a sushi restaurant's online presence, order processing, table reservations, and customer inquiries.
The website devides in to section with ADMIN and USER role. Only ADMIN has button DASHBOARD to manage alla of the necessary matter such as Users order, reservation etc.

Project Background
The project has been developed to fulfill the final requirements of our yearly course at the Digital Career Institute. The project team consists of :

- Neda Salahian [https://github.com/Neda-Salahian]
- Aryani Puspitasari [https://github.com/Aryanipuspitasari]
- Mohammed Al Zahra [https://github.com/MohammedAlZahra]

## Tech Stack
### Frontend

- React with Vite for rapid development
- React Router for client-side routing
- CSS for styling and UI components
- React Bootstrap for styling and UI components
- 


## Features

1. User Authentication

- Users are required to sign up to access the home menu.
- Upon signing up or logging in, users receive a unique token stored in cookies for secure authentication.
- One user account per email address to prevent cross-information.

2. Menu Selection and Order Management

- Users can browse and select items from the food and beverages menu.
- The user's order is updated dynamically as items are added.
- System collects necessary information for delivery orders including address, calculates total price, and offers multiple payment methods.
- Payment section is available with either with PayPal or credit Card. (Please do not input your actual credit card number for testing).
- User can browse and select the items from menu without login and will direct to basket but in order to do the payment to place order, user will be asked to log in and the selected items will be save in localstorage.

3. Table Reservation

- Users, both registered and guests, can make table reservations directly from the website.

4. Customer Support

- A question and answer section allows users to send messages without requiring login or signup.

5. Admin Dashboard

- Admin role allows posting, editing, and deleting menu items based on the company's requirements.
- View and manage order lists, including status updates such as confirmed, delivered, and pending.
- Receive and manage table reservations and guest messages.


## Installation

- Clone the repository.
- Navigate to the frontend directory.
- Run npm install to install dependencies.
- Set up environment variables (e.g., API URL) in a .env file.
- Run npm run dev to start the development server.

#### Note: Work in Progress
Both the frontend and backend projects are currently under development. Therefore, the README data and content may change as the projects progress. Thank you for understanding.
