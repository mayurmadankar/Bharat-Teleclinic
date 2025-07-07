import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BreadcrumbProvider } from "./context/BreadcrumbContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BreadcrumbProvider>
      <App />
    </BreadcrumbProvider>
  </BrowserRouter>
);
