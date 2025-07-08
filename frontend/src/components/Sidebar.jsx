import {
  FaHome,
  FaPhone,
  FaFilePrescription,
  FaMoneyCheckAlt,
  FaUserMd,
  FaPills,
  FaBullhorn,
  FaClinicMedical,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { useBreadcrumb } from "../context/BreadcrumbContext";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { breadcrumb, setBreadcrumb } = useBreadcrumb();

  return (
    <aside className="w-64 min-h-screen bg-white border-r px-4 py-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-10">
        BHARAT <br /> <span className="text-blue-500">TELE CLINIC</span>
      </h2>

      <nav className="flex flex-col gap-2 text-lg text-gray-700">
        <span className="font-semibold text-xs text-gray-500 mb-1">
          GENERAL
        </span>

        <NavItem
          icon={<FaHome />}
          label="Dashboard"
          onClick={() => {
            setBreadcrumb("Dashboard");
            navigate("/dashboard");
          }}
          active={breadcrumb === "Dashboard"}
        />
        <NavItem
          icon={<FaPhone />}
          label="Instant Call"
          onClick={() => {
            setBreadcrumb("Instant Call");
            navigate("/instant-call");
          }}
          active={breadcrumb === "Instant Call"}
        />
        <NavItem
          icon={<FaFilePrescription />}
          label="Prescription"
          onClick={() => {
            setBreadcrumb("Prescription");
            navigate("/prescription");
          }}
          active={breadcrumb === "Prescription"}
        />
        <NavItem
          icon={<FaMoneyCheckAlt />}
          label="Payment"
          onClick={() => {
            setBreadcrumb("Payment");
            navigate("/payment");
          }}
          active={breadcrumb === "Payment"}
        />
        <NavItem
          icon={<FaUserMd />}
          label="Doctor"
          onClick={() => {
            setBreadcrumb("Doctor");
            navigate("/doctor");
          }}
          active={breadcrumb === "Doctor"}
        />
        <NavItem
          icon={<FaPills />}
          label="Pharmacist"
          onClick={() => {
            setBreadcrumb("Pharmacist");
            navigate("/pharmacist");
          }}
          active={breadcrumb === "Pharmacist"}
        />

        <NavItem
          icon={<FaBullhorn />}
          label="Ad Manager"
          onClick={() => {
            setBreadcrumb("Ad Manager");
            navigate("/ad-manager");
          }}
          active={breadcrumb === "Ad Manager"}
        />

        <NavItem
          icon={<FaClinicMedical />}
          label="Pharma"
          onClick={() => {
            setBreadcrumb("Pharma");
            navigate("/pharma");
          }}
          active={breadcrumb === "Pharma"}
        />
        <NavItem
          icon={<FaUsers />}
          label="Clinic"
          onClick={() => {
            setBreadcrumb("Clinic");
            navigate("/clinic");
          }}
          active={breadcrumb === "Clinic"}
        />
        <NavItem
          icon={<FaClipboardList />}
          label="Referral"
          onClick={() => {
            setBreadcrumb("Referral");
            navigate("/referral");
          }}
          active={breadcrumb === " Referral"}
        />
        <NavItem
          icon={<FaClipboardList />}
          label="Audit Trail"
          onClick={() => {
            setBreadcrumb("Audit Trail");
            navigate("/audit-trail");
          }}
          active={breadcrumb === "Audit Trail"}
        />

        <span className="font-semibold text-xs text-gray-500 mt-6 mb-1">
          SYSTEM
        </span>
        <NavItem icon={<FaQuestionCircle />} label="Help Center" />
        <NavItem icon={<FaCog />} label="Settings" />
      </nav>

      <button className="flex items-center gap-2 text-red-500 mt-10">
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

const NavItem = ({ icon, label, active, onClick }) => {
  const baseClasses = `flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors`;
  const activeClasses = active
    ? "bg-blue-900 text-white font-semibold"
    : "hover:bg-gray-100 text-gray-700";

  return (
    <div onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      <div className="text-lg">{icon}</div>
      {label}
    </div>
  );
};

export default Sidebar;
