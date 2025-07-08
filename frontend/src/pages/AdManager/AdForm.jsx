import { useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const AdForm = () => {
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb("Ad Manager > New > Edit");
  }, [setBreadcrumb]);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-white rounded shadow">
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />
        <p className="text-3xl font-semibold text-gray-700">Profile Picture</p>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
        <div className="col-span-full">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Basic Details
          </h2>
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter Your First Name"
            className="input"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter Your Last Name"
            className="input"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="input"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter Your Phone Number"
            className="input"
          />
        </div>

        <div className="col-span-full mt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Campaign Details
          </h2>
        </div>
        <div>
          <label>Campaign Title</label>
          <input
            type="text"
            placeholder="Enter the Title of your Campaign"
            className="input"
          />
        </div>
        <div>
          <label>Campaign Brand Category</label>
          <input
            type="text"
            placeholder="Enter the Brand Category of your Campaign"
            className="input"
          />
        </div>
        <div>
          <label>Campaign Type</label>
          <input
            type="text"
            placeholder="Enter the Type of your Campaign"
            className="input"
          />
        </div>
        <div>
          <label>Campaign Description</label>
          <input
            type="text"
            placeholder="Enter the Description of your Campaign"
            className="input"
          />
        </div>
        <div className="col-span-full">
          <label>Campaign Objective</label>
          <input
            type="text"
            placeholder="Enter the Objective of your Campaign"
            className="input"
          />
        </div>

        <div className="col-span-full mt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Campaign Creatives
          </h2>
        </div>
        <div>
          <label>Upload Campaign (JPEG/JPG/PNG)</label>
          <input type="file" className="input" />
        </div>
        <div>
          <label>Upload Thumbnail (JPEG/JPG/PNG)</label>
          <input type="file" className="input" />
        </div>
        <div className="col-span-full">
          <label>Click through QR Code</label>
          <input type="file" className="input" />
        </div>

        <div className="col-span-full mt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Campaign Location
          </h2>
        </div>
        <div>
          <label>Select Country</label>
          <select className="input">
            <option>Enter your Country</option>
          </select>
        </div>
        <div>
          <label>Select State</label>
          <select className="input">
            <option>Enter your State</option>
          </select>
        </div>
        <div>
          <label>Select City</label>
          <input type="text" placeholder="Enter your City" className="input" />
        </div>
        <div>
          <label>PIN Code</label>
          <input type="text" placeholder="Enter PIN Code" className="input" />
        </div>

        {/* Campaign Schedule & Location */}
        <div className="col-span-full mt-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Campaign Schedule & Location
          </h2>
        </div>

        <div>
          <label>Campaign Start Date</label>
          <input
            type="date"
            className="input"
            placeholder="Select Campaign Start Date"
          />
        </div>
        <div>
          <label>Campaign End Date</label>
          <input
            type="date"
            className="input"
            placeholder="Select Campaign End Date"
          />
        </div>

        <div>
          <label>Frequency:</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Full day loop"
              className="input pr-10"
              readOnly
            />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <i className="fas fa-chevron-down text-gray-500 text-sm" />
            </div>
          </div>
        </div>

        <div>
          <label>Custom:</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Custom"
              className="input pr-10"
              readOnly
            />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <i className="fas fa-chevron-down text-gray-500 text-sm" />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label>Time Slots:</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="relative">
                <input
                  type="text"
                  placeholder="Full day loop"
                  className="input pr-10"
                  readOnly
                />
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-500 text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-full mt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Campaign Budget & Pricing
          </h2>
        </div>
        <div>
          <label>Campaign Base Price</label>
          <input type="text" className="input" />
        </div>
        <div>
          <label>Campaign Add-ons</label>
          <input type="text" className="input" />
        </div>
        <div>
          <label>Campaign Taxes</label>
          <input type="text" className="input" />
        </div>
        <div>
          <label>Campaign Final Cost</label>
          <input type="text" className="input" />
        </div>

        <div className="col-span-full flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-950 text-white font-medium px-6 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdForm;
