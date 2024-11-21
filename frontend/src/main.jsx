import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Module from "./pages/Module.jsx";
import AddModule from "./pages/AddModule.jsx";
import ModuleDetail from "./pages/ModuleDetail.jsx";
import UpdateModule from "./pages/UpdateModule.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="modules" element={<Module />} />
        <Route path="modules/add" element={<AddModule />} />
        <Route path="modules/:id" element={<UpdateModule />} />
        <Route path="modules/detail/:id" element={<ModuleDetail />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);