import { useLocation } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import { useBreadcrumb } from "../context/BreadcrumbContext";

const Header = () => {
  // const location = useLocation();
  const { breadcrumb } = useBreadcrumb();

  const getTitle = () => {
    return (
      <nav className="text-2xl text-gray-500 font-medium">
        {breadcrumb.split(">").map((crumb, i, arr) => (
          <span key={i}>
            <span className={i === arr.length - 1 ? "text-gray-800" : ""}>
              {crumb.trim()}
            </span>
            {i < arr.length - 1 && <span className="mx-1">›</span>}
          </span>
        ))}
      </nav>
    );
  };

  return (
    <header className="px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-gray-800">{getTitle()}</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="text-gray-500 hover:text-blue-500">
          <FaBell className="text-lg" />
        </button>
        <img
          src="https://i.pravatar.cc/36?img=3"
          alt="User"
          className="w-9 h-9 rounded-full border border-gray-300 object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
