// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import { LayoutProvider } from "./providers/LayoutContext";
import { AppProvider } from "./providers/AppContext";
import SidebarLayout from "./layouts/SidebarLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Apps from "./pages/Apps";
import CreateApp from "./pages/CreateApp";
import Upload from "./pages/Upload";
import AppDetails from "./pages/AppDetails";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <AppProvider>
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

          <Routes>
            <Route path="/login" element={<PublicLogin />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SidebarLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="apps" element={<Apps />} />
              <Route path="apps/create" element={<CreateApp />} />
              <Route path="apps/upload/version" element={<Upload />} />
              <Route path="apps/:id" element={<AppDetails />} />
              <Route path="upload" element={<Upload />} />
              <Route path="stats" element={<Stats />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </LayoutProvider>
    </AuthProvider>
  );
}

function PublicLogin() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Login />;
}
