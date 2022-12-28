import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./style.css";

export const User = (props) => {
  const { user } = useAuth0();
  return (
    <div class="card user-container">
      <div class="card-body">
        <img class="card-img-top" src={user.picture} alt={user.name} />
        <h2 class="card-title">{user.name}</h2>
        <p class="card-text">{user.email}</p>
      </div>
    </div>
  );
};
