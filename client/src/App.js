import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import MyApplications from "./pages/MyApplications";
import JobDetails from "./pages/JobDetails";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route
  path="/dashboard"
  element={<Dashboard />}
/>

<Route
  path="/my-applications"
  element={<MyApplications />}
/>

<Route path="/jobs" element={<Jobs />} />
<Route
  path="/jobs/:id"
  element={<JobDetails />}
/>

<Route
  path="/add-job"
  element={<AddJob />}
/>

<Route
  path="/edit-job/:id"
  element={<EditJob />}
/>

<Route
  path="/admin"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/applications"
  element={<AdminApplications />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/saved-jobs"
  element={<SavedJobs />}
/>
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;