// src/providers/AppContext.jsx
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../services/config";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------------------
     Fetch All Apps
  ----------------------------*/
  const fetchApps = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");

      const res = await axios.get(`${BASE_URL}/app-store/app`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // API returns { status, data: [] }
      setApps(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching apps:", err);
      toast.error("Failed to load apps");
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
      Create App
  ----------------------------*/
  const createApp = async (payload) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const res = await axios.post(
        `${BASE_URL}/app-store/app/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("App created successfully");  // 🔥 Show toast message

      await fetchApps(); // Reload list

      return res.data;
    } catch (err) {
      console.error("Error creating app:", err);
      toast.error("Failed to create app"); // 🔥 Error toast
      return null;
    }
  };

  return (
    <AppContext.Provider value={{ apps, loading, fetchApps, createApp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
