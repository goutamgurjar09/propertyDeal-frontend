import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeSection from "./Pages/HomePage/HomeSection";
import CoustomContact from "./Pages/HomePage/CoustomContact";
import FAQ from "./Pages/HomePage/FAQ";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import PropertyDetails from "./Pages/PropertyDetails";
import Dashboard from "./Admin-Page/Dashboard";
import Services from "./Pages/HomePage/Services";
import PropertyCard from "./Pages/PropertyCard";
import BookingPage from "./Pages/BookingPage";
import ForgotPassword from "./ForgotPassword";
import CommercialPage from "././Pages/Categories/CommercialPage";
import PremiumPage from "././Pages/Categories/PremiumPage";
import LuxuryPage from "././Pages/Categories/PremiumPage";
import Cards from "./Pages/HomePage/Cards";
import AboutUs from "./Pages/AboutUs";
import { TrendingProperty } from "./Pages/HomePage/TrendingProperty";
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
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import HowItWorks from "./Pages/HomePage/HowItWorks";
import ScrollToTop from "./Pages/ScrollToTop";
import AdminProfile from "./Admin-Page/Profile"
import BuyerProfile from "./Buyer/Profile";

function App() {
  const CLIENT_ID =
    "160483331532-ehfiher4egcksebq5g7lr921nq3g7n28.apps.googleusercontent.com";
  const [userRole, setUserRole] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(getUserDetail());

  useEffect(() => {
    if (user && user.role === "admin") {
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
        {userRole ? null : <Navbar />}
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeSection />
                <TrendingProperty />
                <Services />
                <Cards />
                <HowItWorks />
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
          <Route path="/About" element={<AboutUs />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsConditions" element={<TermsAndConditions />} />
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AdminProfile setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyer-profile"
            element={
              <ProtectedRoute>
                <BuyerProfile setUser={setUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
