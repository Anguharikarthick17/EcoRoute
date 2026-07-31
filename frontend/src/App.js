import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Navigation } from "./components/Navigation/Navigation";

// Optimized Lazy Loading & Code Splitting
const Home = lazy(() => import("./pages/Home/Home").then((m) => ({ default: m.Home })));
const Login = lazy(() => import("./pages/Login/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("./pages/Register/Register").then((m) => ({ default: m.Register })));
const Profile = lazy(() => import("./pages/Profile/Profile").then((m) => ({ default: m.Profile })));
const ItemManagement = lazy(() => import("./pages/ItemManagement/ItemManagement").then((m) => ({ default: m.ItemManagement })));
const RewardHistory = lazy(() => import("./pages/RewardHistory/RewardHistory").then((m) => ({ default: m.RewardHistory })));
const PriorityManagement = lazy(() => import("./pages/PriorityManagement/PriorityManagement").then((m) => ({ default: m.PriorityManagement })));

export function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("ecoroute_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ecoroute_user");
    localStorage.removeItem("ecoroute_token");
    setUser(null);
  };

  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc", fontFamily: "sans-serif" }}>
        <Header user={user} onLogout={handleLogout} />
        <Navigation />
        <main style={{ flex: 1 }}>
          <Suspense fallback={<div style={{ padding: "3rem", textAlign: "center" }}>Loading EcoRoute Application...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLoginSuccess={(u) => setUser(u)} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/items" element={<ItemManagement />} />
              <Route path="/rewards" element={<RewardHistory />} />
              <Route path="/priority" element={<PriorityManagement />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
