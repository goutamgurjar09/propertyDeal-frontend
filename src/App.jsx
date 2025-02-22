import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Coustom_navbar from "./Pages/Coustom_navbar";
import HomeSection from "./Pages/HomeSection";
import Cotegories from "./Pages/Cotegories";
import Coustom_Fotter from "./Pages/Coustom_Fotter";
import Coustom_contact from "./Pages/Coustom_contact";
import FAQ from "./Pages/FAQ";
import LoginPage from "./Login-Page";
import SignupPage from "./Signup-Page";
import PropertyDetails from "./Pages/PropertyDetails";
import Dashboard from "./Admin-Page/Dashboard";
import Services from "./Pages/Services";
import PropertyCard from "./Pages/PropertyCard";
import BookingPage from "./Pages/Booking_Page";
import ForgotPassword from "./ForgotPassword";
import CommercialPage from "./Pages/CommercialPage";
import PremiumPage from "./Pages/PremiumPage";
import LuxuryPage from "./Pages/LuxuryPage";
import Cards from "./Pages/Cards";
import AboutUs from "./Pages/About_us";
import Trending_pro from "./Pages/Trending_pro";

function App() {
  return (
    <Router>
      <div>
        <Coustom_navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeSection />
               <AboutUs/>
               <Trending_pro/>
                <Cotegories />
                <Services />
                 <Cards/>
                
                <FAQ />
                <Coustom_contact />
              </>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />

          {/* Property Pages */}
          <Route path="/property-card" element={<PropertyCard />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/luxury" element={<LuxuryPage />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/booking" element={<BookingPage />} />

          <Route path="/Coustom_contact" element={<Coustom_contact />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>

        <Coustom_Fotter />
      </div>
    </Router>
  );
}

export default App;



