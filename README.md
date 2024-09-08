# Flight Booking System Backend

This is the backend of the Flight Booking System, a RESTful API built with Node.js, Express, and MongoDB.

## Live API
[https://flightbookingbackend-ql1d.onrender.com/](https://flightbookingbackend-ql1d.onrender.com/)

## Features
- User authentication (JWT, bcrypt)
- Role-based access (Admin, User)
- CRUD operations for flights (Admin)
- Book flights
- Fetch booking history
- Email confirmation for bookings
- Input validation and error handling

## Technologies
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Nodemailer for sending emails

## API Endpoints

- `POST /api/register`: Register a new user
- `POST /api/login`: Login a user
- `GET /api/flihgt/getFlights`: Get all flights
- `GET /api/flight/search`: Get searchFlights
- `POST /api/bookings`: Book a flight (requires authentication)
- `GET /api/bookings/user/:id`: Get user booking history
- `POST /api/flights`: Add a new flight (Admin only)
- `PUT /api/flights/:id`: Update a flight (Admin only)
- `DELETE /api/flights/:id`: Delete a flight (Admin only)

## Setup and Installation
1. Clone the repository:
   git clone https://github.com/zituhossain/flightBookingBackend.git
   cd flightBookingBackend

## Install dependencies:  
    npm install

## Set up environment variables: Create a .env file and add the following:  
PORT = 8000
MONGO_URI = mongodb+srv://zitu:zitu@cluster0.f2fxay2.mongodb.net/flightBooking
SECRET_KEY = ABSKskfjskfjskjfsdkf989898@ksfjskfjs6454534%fIU093e3
EMAIL_USER=zituinsiderbd@gmail.com
EMAIL_PASS=elwcoqxhtmzrabxt

## Run the application:
  npm run dev
