import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { getAuth } from "firebase/auth";
import app from "../../../firebase/firebase.config";

const Dashboard = () => {
  return (
    <div className="dashboard-main">
      <div className="col-md-2 col-sm-6 col-12">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
