import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import BlogDetails from "./components/Home/BlogDetails/BlogDetails";

// import './App.css';
import Home from './components/Home/Home/Home';
import Services from "./components/Home/Services/Services";
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

        <Route path="/blogdetails/:id" element={<BlogDetails />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
