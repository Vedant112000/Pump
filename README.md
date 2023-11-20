# Fuel Station Finance Management System

Welcome to the Fuel Station Finance Management System! This application is designed to streamline the financial management processes for fuel stations, providing supervisors and owners with valuable insights into sales, cash flow, and overall financial performance.

## Technologies Used
- **MySQL:** The database management system used to store and retrieve data efficiently.
- **Express:** A web application framework for Node.js used to build the backend of the application.
- **Node.js:** The runtime environment that executes JavaScript code on the server side.
- **React:** A JavaScript library for building user interfaces, used to create an interactive and dynamic frontend.

## Features

### Sales Calculation and Reporting
Supervisors can easily calculate sales generated from each pump's side, considering both fuel types. The application allows the generation of detailed reports for each MPD (Multiple Product Dispenser) shift. These reports include information about sales, cash transactions, and online collections.

#### Generating Reports
The system leverages the powerful jspdf library to create comprehensive reports that provide a clear overview of financial transactions during a specific shift.

### Shift-wise Financial Summary
Owners can access a consolidated shift report for the entire day. This report provides a summarized view of the day's financial activities, empowering owners to make informed decisions about the station's finances.

### Creditor and Employee Management
The application includes modules for managing creditor and employee data. This functionality ensures that essential information is stored and easily accessible when needed.

### Dashboard
The dashboard provides a centralized view of overall data, offering supervisors and owners a quick and comprehensive snapshot of the fuel station's financial performance.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MySQL database set up with the required tables and schema.

### Installation
1. Clone the repository: `git clone https://github.com/your-username/your-project.git`
2. Navigate to the project directory: `cd your-project`
3. Install backend dependencies: `npm install`
4. Navigate to the client directory: `cd client`
5. Install frontend dependencies: `npm install`
6. Return to the project root: `cd ..`

### Configuration
1. Set up your MySQL database connection in the `config` folder.
2. Update necessary configuration files based on your environment.

### Running the Application
1. Start the backend server: `cd backend` and then `npm start`
2. Start the frontend application: `cd frontend`, `cd pump` and then `npm start`

Visit `http://localhost:3000` in your browser to access the Fuel Station Finance Management System.

## Testing Version
Please note that this version is currently in testing and is continuously being developed based on user feedback. Your input is valuable, and we encourage you to provide feedback to help us improve the system.

## Developer
This application is developed by Vedant Raut.

