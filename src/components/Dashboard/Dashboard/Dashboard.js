import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { getAuth } from "firebase/auth";
import app from "../../../firebase/firebase.config";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const BackendLink = process.env.REACT_APP_BACKENDLINK;
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log(
    "currentUserInDashboard: ***************************:",
    currentUser
  );

  const fetchData = async (roleType) => {
    try {
      const response = await fetch(`${BackendLink}/${roleType}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${roleType} data`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${roleType} data:`, error);
      return false;
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const [admin, superAdmin, doctor] = await Promise.all([
        fetchData("isAdmin"),
        fetchData("isSuperAdmin"),
        fetchData("isDoctor"),
      ]);

      setIsAdmin(admin);
      setIsSuperAdmin(superAdmin);
      setIsDoctor(doctor);
      setLoading(false);
    };

    fetchRoles();
  }, []);

  return (
    <div className="dashboard-main">
      <div className="col-md-2 col-sm-6 col-12">
        <Sidebar
          loading={loading}
          isAdmin={isAdmin}
          isSuperAdmin={isSuperAdmin}
          isDoctor={isDoctor}
        />
      </div>
    </div>
  );
};

export default Dashboard;
