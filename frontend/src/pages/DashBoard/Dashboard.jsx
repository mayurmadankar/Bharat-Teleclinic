import { use, useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

function Dashboard() {
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb("Dashboard");
  }, [setBreadcrumb]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">This is the Dashboard page.</p>
    </div>
  );
}
export default Dashboard;
