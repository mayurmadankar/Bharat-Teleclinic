import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/DashBoard/Dashboard";
import AdList from "../pages/AdManager/AdList";
import AdForm from "../pages/AdManager/AdForm";
import AdView from "../pages/AdManager/AdView";
import AuditTrail from "../pages/AuditTrail/AuditTrail";
import Clinic from "../pages/Clinic/Clinic";
import Instantcall from "../pages/InstantCall/Instantcall";
import Doctor from "../pages/Doctor/Doctor";
import Payment from "../pages/Payment/Payment";
import Pharma from "../pages/Pharma/Pharma";
import Pharmacist from "../pages/Pharmacist/Pharmacist";
import Prescription from "../pages/Prescription/Prescription";
import Referral from "../pages/Referral/Referal";
import PushNotification from "../components/PushNotification";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ad-manager" element={<AdList />} />
      <Route path="/view-user" element={<AdView />} />
      <Route path="/edit-form" element={<AdForm />} />
      <Route path="/audit-trail" element={<AuditTrail />} />
      <Route path="/instant-call" element={<Instantcall />} />
      <Route path="/clinic" element={<Clinic />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/pharmacist" element={<Pharmacist />} />
      <Route path="/pharma" element={<Pharma />} />
      <Route path="/referral" element={<Referral />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/prescription" element={<Prescription />} />
      <Route path="/push-notification" element={<PushNotification />} />
    </Routes>
  );
}
