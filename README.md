# Office of Career Services (OCS), IIT Delhi - Technical Team Recruitment Assignment
## Live Demo: [Click Here](https://ocs-tech-assignment.vercel.app/)

### Overview:

This repository contains the code for the technical team recruitment assignment from the Office of Career Services (OCS), IIT Delhi. The assignment involved developing an API endpoint and a frontend client to access and display data from Mongodb databse to the browser client, while adhering to certain security and functionality requirements.

### Project Structure:

The project is divided into two main components:

1. **Backend API:**
   - The backend API is implemented using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/).
   - It provides an endpoint to fetch data from Mongodb databse based on user authentication and role-based access control.
   - The database operations are handled using mongoose, which is a library for Mongodb.
   - The API routes are defined in the `routes` directory.
   - Configuration settings such as database connection details are stored in the `.env.example` file.

2. **Frontend Client:**
   - The frontend client is implemented using [React](https://reactjs.org/) framework.
   - It provides a user interface for users to enter their userID and password.
   - The client makes API requests to the backend to fetch and display data based on user input.
   - The user interface components are defined in the `src/components` & `src/pages` directory.
   - Styling is handled using Tailwind CSS & [CSS Modules](https://github.com/css-modules/css-modules).

### How to Run:

Follow these steps to run the project locally:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>

# Setting Up Backend
1. **Install Dependencies**
   ```bash
   cd backend
   npm install

2. **Generate Key Pair for Auth**
   ```bash
   node generateKeypair.js

3. **Make .env file**
   ```bash
   # copy the .env.example content in .env you just created
   # Replace `MONGO_URI` in .env with your original mongodb connection url

4. **Run the App**
   ```bash
   node app.js

# Setting Up Frontend
1. **Install Dependencies**
   ```bash
   cd frontend
   npm install

2. **Check .env file (no need to create new, it should be already there)**
   ```bash
   # make sure `VITE_BACKEND_URL` points to your root backend url, where it is running
   # Example:
   VITE_BACKEND_URL = http://localhost:5000

3. **Run the App**
   ```bash
   npm run dev

4. **Access the Application**
   ```bash
   #Once both the backend API and frontend client are running, you can access the application by navigating to http://localhost:5173/ in your web browser.
   http://localhost:5173/dashboard

## Thank You

