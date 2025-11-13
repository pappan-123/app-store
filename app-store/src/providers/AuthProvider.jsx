// src/providers/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../services/config";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // Restore session
  // ------------------------------------
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const user = sessionStorage.getItem("userDetails");

    if (token && user) {
      setAuthToken(token);
      setUserDetails(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  // ------------------------------------
  // LOGIN
  // ------------------------------------
  const login = async (userName, password) => {
    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/iam/auth/login`, {
        userName,
        password,
        projectId: 1,
      });

      if (res.data?.data?.authToken) {
        const token = res.data.data.authToken.replace(/^Bearer\s+/i, "");

        const loginUserDetails = res.data.data.userDetails;

        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userDetails", JSON.stringify(loginUserDetails));

        setAuthToken(token);
        setUserDetails(loginUserDetails);
        setIsAuthenticated(true);

        toast.success("Login successful");
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // GET USER PROFILE (QUERY PARAMS)
  // ------------------------------------
  const fetchUserProfile = async (userName, token) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/urm/userMaster/fetchDetailsByUserName`,
        {
          params: { userName }, // ✅ Correct way for GET API
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.data) {
        setUserDetails(res.data.data);
        return res.data.data;
      }

      return null;
    } catch (err) {
      console.error("Profile fetch error:", err);
      return null;
    }
  };

  // ------------------------------------
  // LOGOUT
  // ------------------------------------
  const logout = async () => {
    const token = sessionStorage.getItem("authToken");

    try {
      setLoading(true);

      if (token) {
        await axios.post(
          `${BASE_URL}/iam/auth/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      sessionStorage.clear();
      setIsAuthenticated(false);
      setAuthToken(null);
      setUserDetails(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        userDetails,
        loading,
        login,
        logout,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
