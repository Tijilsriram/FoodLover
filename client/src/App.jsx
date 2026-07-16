import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import ScrollToSection from "./ScrollToSection";
import ReservationSuccess from "./pages/ReservationSuccess";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function Layout() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname === "/admin/login";

  return (
    <>
      {!isAdminPage && (
        <>
          <Navbar />
          <ScrollToSection />
        </>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/menu" element={<LandingPage />} />
        <Route path="/reservation" element={<LandingPage />} />
        <Route path="/blog" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />

        <Route
          path="/reservation-success"
          element={<ReservationSuccess />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;