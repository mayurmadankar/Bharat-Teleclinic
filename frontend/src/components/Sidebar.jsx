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
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          onClick={() => navigate("/dashboard")}
          // active={location.pathname === "/dashboard"}
        />
        <NavItem
          icon={<FaPhone />}
          label="Instant Call"
          onClick={() => navigate("/instant-call")}
          // active={location.pathname === "/instant-call"}
        />
        <NavItem
          icon={<FaFilePrescription />}
          label="Prescription"
          onClick={() => navigate("prescription")}
          // active={location.pathname === "/prescription"}
        />
        <NavItem
          icon={<FaMoneyCheckAlt />}
          label="Payment"
          onClick={() => navigate("payment")}
          // active={location.pathname === "/payment"}
        />
        <NavItem
          icon={<FaUserMd />}
          label="Doctor"
          onClick={() => navigate("doctor")}
          // active={location.pathname === "/doctor"}
        />
        <NavItem
          icon={<FaPills />}
          label="Pharmacist"
          onClick={() => navigate("pharmacist")}
          // active={location.pathname === "/pharmacist"}
        />

        <NavItem
          icon={<FaBullhorn />}
          label="Ad Manager"
          onClick={() => navigate("/ad-manager")}
          // active={location.pathname === "/ad-manager"}
        />

        <NavItem
          icon={<FaClinicMedical />}
          label="Pharma"
          onClick={() => navigate("/pharma")}
          // active={location.pathname === "/pharma"}
        />
        <NavItem
          icon={<FaUsers />}
          label="Clinic"
          onClick={() => navigate("/clinic")}
          // active={location.pathname === "/clinic"}
        />
        <NavItem
          icon={<FaClipboardList />}
          label="Referral"
          onClick={() => navigate("/referral")}
          // active={location.pathname === "/referral"}
        />
        <NavItem
          icon={<FaClipboardList />}
          label="Audit Trail"
          onClick={() => navigate("/audit-trail")}
          // active={location.pathname === "/audit-trail"}
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
  const baseClasses = `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer`;
  const activeClasses = active ? "bg-blue-100 text-blue-700 font-semibold" : "";

  return (
    <div onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {icon}
      {label}
    </div>
  );
};

export default Sidebar;
