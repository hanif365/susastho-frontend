import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './components/Home/Home/Home';
import Doctors from "./components/ServicesDetails/Doctors/Doctors";
import Footer from "./components/Shared/Footer/Footer";
import Navbar from "./components/Shared/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/">
          <Home></Home>
        </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/services" element={<Services />} /> */}

        <Route path="/doctors" element={<Doctors />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
