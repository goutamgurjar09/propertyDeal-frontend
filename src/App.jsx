import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeSection from "./Pages/HomeSection";
import CoustomContact from "./Pages/CoustomContact";
import FAQ from "./Pages/FAQ";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import PropertyDetails from "./Pages/PropertyDetails";
import Dashboard from "./Admin-Page/Dashboard";
import Services from "./Pages/Services";
import PropertyCard from "./Pages/PropertyCard";
import BookingPage from "./Pages/BookingPage";
import ForgotPassword from "./ForgotPassword";
import CommercialPage from "./Pages/CommercialPage";
import PremiumPage from "./Pages/PremiumPage";
import LuxuryPage from "./Pages/LuxuryPage";
import Cards from "./Pages/Cards";
import AboutUs from "./Pages/AboutUs";
import { TrendingProperty } from "./Pages/TrendingProperty";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./Protected/ProtectedRoute";
import AddProperty from "./Admin-Page/AddProperty";
import VerifyUser from "./VerifyUser";
import { getUserDetail } from "./redux/slices/authUtlis";
import { useEffect, useState } from "react";
import UserManagement from "./Admin-Page/UserManagement";
import { Properties } from "./Admin-Page/Properties";
import Booking from "./Admin-Page/Bookings";
import { PropertiesList } from "./Buyer/PropertyList";
import { Enquiries } from "./Admin-Page/Enquiries";
import { Categories } from "./Admin-Page/Category/Categories";
import { FilterProperty } from "./Admin-Page/Category/FilterProperty";
import Navbar from "./Pages/Layout/Navbar";
import Footer from "./Pages/Layout/Footer";

function App() {
  const CLIENT_ID =
    "160483331532-ehfiher4egcksebq5g7lr921nq3g7n28.apps.googleusercontent.com";
  const [userRole, setUserRole] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(getUserDetail());

  useEffect(() => {
    if (user && user.role) {
      setUserRole(true);
    } else {
      setUserRole(null);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Router>
      <div>
        {/* Show navbar only if user is not an admin */}
        {userRole ? null : <Navbar/>}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeSection />
                {/* <AboutUs /> */}
                <TrendingProperty />
                <Services />
                <Cards />
                <FAQ />
                <CoustomContact />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <LoginPage setUser={setUser} />
              </GoogleOAuthProvider>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyUser />} />
          <Route path="/propertyCard" element={<PropertyCard />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/luxury" element={<LuxuryPage />} />
          <Route path="/propertyDetails/:id" element={<PropertyDetails />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<CoustomContact />} />
          <Route path="/About" element={<AboutUs/>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addProperty"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/edit/:id"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserManagement setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <Properties setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Booking setUser={setUser} />
              </ProtectedRoute>
            }
          />
          {/* Buyer */}
          <Route
            path="/properties-list"
            element={
              <ProtectedRoute>
                <PropertiesList setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route path="/property" element={<FilterProperty />} />
          <Route
            path="/enquiries"
            element={
              <ProtectedRoute>
                <Enquiries setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories setUser={setUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
  <Footer/>
      </div>
    </Router>
  );
}

export default App;
