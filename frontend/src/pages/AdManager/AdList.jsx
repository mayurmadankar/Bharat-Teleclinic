import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import campaignsData from "../../Data/campaignsList";
import { Outlet, useNavigate } from "react-router-dom";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const tabs = ["New", "Approved", "Live", "Completed"];

const AdList = () => {
  const [activeTab, setActiveTab] = useState("New");
  const Navigate = useNavigate();
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb("Ad Manager");
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex space-x-22 border-b pb-2 mb-6 text-xl text-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 border-b-2 ${
              activeTab === tab
                ? "border-blue-500 font-semibold text-blue-700"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} {tab === "New"} {tab === "Approved"} {tab === "Live"}{" "}
            {tab === "Completed"}
          </button>
        ))}
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-base text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">
                <input type="checkbox" />
              </th>
              <th className="p-4">Campaign Brand Name</th>
              <th className="p-4">Total Number of Campaign</th>
              <th className="p-4">Campaign manager Name</th>
              <th className="p-4">Campaign manager email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaignsData.map((campaign) => (
              <tr key={campaign.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 font-medium flex items-center gap-2">
                  <i className="fas fa-image text-lg text-gray-600 w-6 h-6 flex items-center justify-center"></i>

                  {campaign.brand}
                </td>
                <td className="p-4">{campaign.total}</td>
                <td className="p-4">{campaign.manager}</td>
                <td className="p-4">{campaign.email}</td>
                <td className="p-4 flex gap-3">
                  <button className="p-2 bg-orange-100 text-orange-500 rounded">
                    <FaEye
                      onClick={() => Navigate(`/view-user/${campaign.id}`)}
                    />
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-yellow-100 text-yellow-600 rounded">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};

export default AdList;
