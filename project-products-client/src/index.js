import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ti3u1n80psnj3o5q.us.auth0.com"
      clientId="JdQVTiH09BuMthyy4kZ18WIk5Rw9ndKB"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
