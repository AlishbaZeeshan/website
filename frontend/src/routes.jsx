import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LogInPage";
import RegistrationPage from "./RegistrationPage";
import Contacts from "./Contacts";
import Faqs from "./Faqs";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import UsersView from "./UsersView";
import MaintainSubscription from "./MaintainSubscription";
import ContentView from "./ContentView";
import Success from "./Success";
import Profile from "./Profile";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/registrationpage", element: <RegistrationPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/faqs", element: <Faqs /> },
  { path: "/admindashboard", element: <AdminDashboard /> },
  { path: "/usersview", element: <UsersView /> },
  { path: "/MaintainSubscription", element: <MaintainSubscription /> },
  { path: "/ContentView", element: <ContentView /> },
  { path: "/success", element: <Success /> },
  { path: "/profile",element: <Profile />},
]);

export default router;
