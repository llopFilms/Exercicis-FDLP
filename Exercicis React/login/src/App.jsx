import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { HOME, LOGIN, PRIVATE, LOGOUT } from "./config/routes/paths";
import Home from "./views/Home";
import Login from "./views/Login";
import Private from "./views/Private";
import Logout from "./views/Logout";
import PublicRoute from "./components/router/PublicRoute";
import PrivateRoute from "./components/router/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Home />} />
            <Route path={LOGIN} element={<Login />} />
          </Route>
          <Route path={PRIVATE} element={<PrivateRoute />}>
            <Route index element={<Private />} />
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
