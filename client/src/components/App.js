import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Header from "./Header";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationPage from "./pages/ApplicationPage";
import RecordList from "./pages/RecordList";
import BookingSlots from "./pages/BookingSlots";
import ApplicationStatus from "./ApplicationStatus";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/user-home" element={<UserDashboard />} />
          <Route path="/admin-home" element={<AdminDashboard />} />
          <Route path="/admin/recordlist" element={<RecordList />} />
          <Route path="/user-application" element={<ApplicationPage />} />
          <Route path="/admin/slots" element={<BookingSlots />} />
          <Route
            path="/user/application-status"
            element={<ApplicationStatus />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
