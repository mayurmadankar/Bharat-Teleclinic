import { FaCheckCircle, FaEdit } from "react-icons/fa";
import campaign from "../../Data/campaignsData";
import { useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { useNavigate } from "react-router-dom";

const AdView = () => {
  const user = {
    name: "John Doe",
    email: "jonedoe123@gmail.com"
  };
  const navigate = useNavigate();
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb("Ad Manager > view");
  }, [setBreadcrumb]);

  console.log(campaign.basicDetails.firstName);

  return (
    <div className="p-9 max-w-8xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-4 border-b pb-4 mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full" />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl">
        <div>
          <h3 className="text-2xl font-semibold text-blue-900 mb-2">
            Basic Details
          </h3>
          <p>First Name: {campaign.basicDetails.firstName}</p>
          <p>Last Name: {campaign.basicDetails.lastName}</p>
          <p>Email: {campaign.basicDetails.email}</p>
          <p>Phone Number: {campaign.basicDetails.phone}</p>

          <h3 className="mt-6 text-2xl font-semibold text-blue-900 mb-2">
            Upload Creative
          </h3>
          <p>First Name: {campaign.creativeUpload.firstName}</p>
          <p>Last Name: {campaign.creativeUpload.lastName}</p>
          <p>Email: {campaign.creativeUpload.email}</p>
          <p>Phone Number: {campaign.creativeUpload.phone}</p>

          <h3 className="mt-6 text-2xl font-semibold text-blue-900 mb-2">
            Campaign Schedule & Duration
          </h3>
          <p>Starting Date: {campaign.schedule.startDate}</p>
          <p>Ending Date: {campaign.schedule.endDate}</p>
          <p>Frequency: {campaign.schedule.frequency}</p>
          <p>Time Slot: {campaign.schedule.timeSlot}</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-blue-900 mb-2">
            Campaign Details
          </h3>
          <p>Title: {campaign.details.title}</p>
          <p>Brand Category: {campaign.details.brandCategory}</p>
          <p>Type: {campaign.details.type}</p>
          <p>Objective: {campaign.details.objective}</p>
          <p>Description: {campaign.details.description}</p>

          <h3 className="mt-6 text-2xl font-semibold text-blue-900 mb-2">
            Campaign Location
          </h3>
          <p>Country: {campaign.location.country}</p>
          <p>State: {campaign.location.state}</p>
          <p>City: {campaign.location.city}</p>
          <p>PIN Code: {campaign.location.pinCode}</p>

          <h3 className="mt-6 text-2xl font-semibold text-blue-900 mb-2">
            Campaign Budget & Pricing
          </h3>
          <p>Base Price: {campaign.pricing.basePrice}</p>
          <p>Add-ons: {campaign.pricing.addons}</p>
          <p>Taxes: {campaign.pricing.taxes}</p>
          <p>Final Cost: {campaign.pricing.finalCost}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-10 justify-end">
        <button
          onClick={() => navigate("/approve-campaign")}
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-lg"
        >
          <FaCheckCircle />
          Approve Campaign
        </button>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <FaEdit />
          Edit Campaign
        </button>
      </div>
    </div>
  );
};

export default AdView;
