import { useAuth0 } from "@auth0/auth0-react";
import { RingLoader } from "react-spinners";

import { Main, UnauthorizedUsersPage } from "./components";

import "./App.css";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (!isLoading) {
    return isAuthenticated ? (
      <Main className="app" />
    ) : (
      <UnauthorizedUsersPage className="app" />
    );
  } else {
    return (
      <div className="spinner-app">
        <RingLoader color="#8d8de3" size={300} />
      </div>
    );
  }
}

export default App;
