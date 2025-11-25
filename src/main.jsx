import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Router from "./ecommerce/components/Router";  
// import App from "./App";

createRoot(document.getElementById("root")).render(
  <Router />
);
