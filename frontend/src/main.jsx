import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BreadcrumbProvider } from "./context/BreadcrumbContext.jsx";
import { CampaignProvider } from "./context/CampaignContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BreadcrumbProvider>
      <CampaignProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CampaignProvider>
    </BreadcrumbProvider>
  </BrowserRouter>
);
