import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// import './App.css';
import Home from './components/Home/Home/Home';
import Services from "./components/Home/Services/Services";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/">
          <Home></Home>
        </Route> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/services" element={<Services />} /> */}
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
