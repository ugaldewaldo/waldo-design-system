import React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

import { Gallery } from "./gallery";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>,
);
