import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./Pages/CustomNavbar";
import HomeSection from "./Pages/HomeSection";
import Cotegories from "./Pages/Cotegories";
import CoustomFooter from "./Pages/CoustomFooter";
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
import TrendingProperty from "./Pages/TrendingProperty";
import { GoogleOAuthProvider } from "@react-oauth/google";
import  ProtectedRoute  from "./Protected/ProtectedRoute";
import AddProperty from "./Admin-Page/AddProperty";
import VerifyUser from "./VerifyUser";
function App() {  
  const CLIENT_ID = "160483331532-ehfiher4egcksebq5g7lr921nq3g7n28.apps.googleusercontent.com"
  return (
    <Router>
      <div>
        <CustomNavbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeSection />
                <AboutUs />
                <TrendingProperty />
                <Cotegories />
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
              <GoogleOAuthProvider clientId = {CLIENT_ID}>
                <LoginPage />
              </GoogleOAuthProvider>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyUser />} />

          {/* Property Pages */}
          <Route path="/propertyCard" element={<PropertyCard />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/luxury" element={<LuxuryPage />} />
          <Route path="/propertyDetails/:id" element={<PropertyDetails />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<CoustomContact/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* <Route path="/add-property" element={<AddProperty/>} /> */}
          <Route
            path="/addProperty"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
        </Routes>
        <CoustomFooter />
      </div>
    </Router>
  );
}

export default App;
