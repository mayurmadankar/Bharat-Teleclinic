import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/DashBoard/Dashboard";
import AdList from "../pages/AdManager/AdList";
import AdForm from "../pages/AdManager/AdForm";
import AdView from "../pages/AdManager/AdView";
// import Instantcall from "../pages/InstantCall/Instantcall";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ad-manager" element={<AdList />} />
      <Route path="/view-user" element={<AdView />} />
    </Routes>
  );
}
