import { createContext, useContext, useState } from "react";
import campaignsData from "../Data/campaignsList";

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const [newCampaigns, setNewCampaigns] = useState(campaignsData);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const approveCampaign = (id) => {
    const campaign = newCampaigns.find((c) => c.id === id);
    if (campaign) {
      setApprovedCampaigns((prev) => [...prev, campaign]);
      setNewCampaigns((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const deleteApprovedCampaign = (id) => {
    setApprovedCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CampaignContext.Provider
      value={{
        newCampaigns,
        approvedCampaigns,
        selectedCampaign,
        setSelectedCampaign,
        approveCampaign,
        deleteApprovedCampaign
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => useContext(CampaignContext);
