# EventGenie - Full-Stack Event Planning Platform

Welcome to **EventGenie**, a comprehensive full-stack application designed to streamline the event planning process. This platform connects customers with various service vendors, allowing them to browse, book, and manage services for their events seamlessly.

## 🚀 Key Features

### For Customers:
- **Service Discovery**: Browse a wide range of event services, including venues, catering, decor, and entertainment.
- **Advanced Filtering**: Filter services by category, price, rating, date availability, and other criteria.
- **Shopping Cart**: Add multiple services to a cart for a specific event date.
- **Booking Management**: Book services, view past and upcoming bookings, and manage your event schedule.
- **User Profiles**: Manage your profile, including contact information and profile photo.
- **Reviews and Ratings**: Leave reviews and ratings for services you've used to help other users.

### For Vendors:
- **Service Management**: Create, update, and delete service listings.
- **Vendor Dashboard**: View all your listed services and manage your offerings.
- **Booking Visibility**: See which dates your services are booked for.

## 🛠️ Tech Stack

This project is a monorepo containing two main parts:

1.  **`eventgenie` (Frontend)**:
    -   **Framework**: React.js (with Vite)
    -   **Styling**: Custom CSS with responsive design
    -   **Key Libraries**: `react-router-dom` for navigation

2.  **`server` (Backend)**:
    -   **Framework**: Node.js with Express.js
    -   **Database**: MongoDB with Mongoose for data modeling
    -   **API**: RESTful API for handling all application data (services, users, bookings, etc.)

## 📁 Project Structure

```
aac/
├── eventgenie/     # React frontend application
│   ├── src/
│   └── ...
└── server/         # Node.js backend server
    ├── models/
    ├── routes/
    └── server.js
```

## ⚙️ Getting Started

### Prerequisites
- Node.js and npm
- MongoDB instance running

### Installation and Setup

1.  **Clone the repository.**
2.  **Install frontend dependencies**:
    ```bash
    cd eventgenie
    npm install
    ```
3.  **Install backend dependencies**:
    ```bash
    cd ../server
    npm install
    ```

### Running the Application

1.  **Start the backend server**:
    -   Navigate to the `server` directory.
    -   Ensure your MongoDB server is running.
    -   Run `npm start`.
    -   The server will start on `http://localhost:5001`.

2.  **Start the frontend development server**:
    -   Navigate to the `eventgenie` directory.
    -   Run `npm run dev`.
    -   The application will be available at `http://localhost:5173`.

---

This README provides a central point of information for the EventGenie platform, covering its features, technology, and setup instructions. 