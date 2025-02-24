import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/WebDev";
import Contact from "./pages/Contact";
import WebDev from "./pages/WebDev";
import MobileDev from "./pages/MobileDev";
import Cloud from "./pages/Cloud";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/web-dev" element={<WebDev />} />
          <Route path="/mobile-dev" element={<MobileDev />} />
          <Route path="/cloud" element={<Cloud />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
