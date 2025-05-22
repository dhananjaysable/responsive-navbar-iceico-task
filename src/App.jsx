import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WebDev from "./pages/WebDev";
import MobileDev from "./pages/MobileDev";
import Cloud from "./pages/Cloud";
import TermsAndConditions from "./pages/termandconditions";


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />

        <Routes>
          <Route path="responsive-navbar-iceico-task/" element={<Home />} />
          <Route
            path="responsive-navbar-iceico-task/about"
            element={<About />}
          />
          <Route
            path="responsive-navbar-iceico-task/contact"
            element={<Contact />}
          />
          <Route
            path="responsive-navbar-iceico-task/web-dev"
            element={<WebDev />}
          />
          <Route
            path="responsive-navbar-iceico-task/mobile-dev"
            element={<MobileDev />}
          />
          <Route
            path="responsive-navbar-iceico-task/cloud"
            element={<Cloud />}
          />
          <Route
            path="responsive-navbar-iceico-task/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
