# Pet Health Tracker

Pet Health Tracker is a web application designed to help veterinary clinics manage patient information, appointments, and medical histories efficiently. It provides a role-based interface for administrators, receptionists, and veterinarians, ensuring that users have access to the features relevant to their roles.

## Features

* **Role-Based Access Control**:
    * **Administrator**: Can access all features, including a dashboard with clinic-wide statistics.
    * **Receptionist**: Can manage clients and appointments.
    * **Veterinarian**: Can manage clients, appointments, medical histories, and vaccinations.
* **Client Management**: View and manage a list of clients and their pets.
* **Appointment Scheduling**: Create, view, and complete appointments.
* **Medical Records**: Access and view detailed medical histories for pets.
* **Vaccination Tracking**: (Veterinarian-only) Assign and track pet vaccinations.
* **Dashboard**: (Administrator-only) An overview of key clinic metrics, including appointment statistics, active users, total pets, and average appointments per veterinarian.
* **PDF Report Generation**: Administrators can generate a PDF summary of the dashboard statistics.
* **Internationalization**: The application supports both English and Spanish.
* **Dark/Light Theme**: Users can switch between dark and light themes for better visual comfort.
* **Live Support Chat**: A chat widget for users to get quick support.

## Tech Stack

* **Frontend**:
    * [React](https://reactjs.org/)
    * [React Router](https://reactrouter.com/) for routing.
    * [Tailwind CSS](https://tailwindcss.com/) for styling.
* **Backend**:
    * FastAPI (Python)
    * The backend code is located in the [PetHealthTracker-backend-Deploy](https://github.com/rooseveltalej/PetHealthTracker-backend-Deploy) repository.
* **Internationalization**:
    * [i18next](https://www.i18next.com/) with [react-i18next](https://react.i18next.com/).
* **Charting**:
    * [Recharts](https://recharts.org/) and [Chart.js](https://www.chartjs.org/) for data visualization on the dashboard.
* **PDF Generation**:
    * [@react-pdf/renderer](https://react-pdf.org/) for creating PDF documents on the client-side.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

## Environment Variables

The project uses a `.env` file for environment variables. The `REACT_APP_API_BASE_URL` variable is used to specify the base URL for the API.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
