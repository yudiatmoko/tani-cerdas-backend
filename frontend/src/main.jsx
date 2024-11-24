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
import Course from "./pages/Course.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import UpdateCourse from "./pages/UpdateCourse.jsx";
import AddCourseModules from "./pages/AddCourseModules.jsx";
import Booking from "./pages/Booking.jsx";
import AddBooking from "./pages/AddBooking.jsx";
import UpdateBooking from "./pages/UpdateBooking.jsx";

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
        <Route path="courses" element={<Course />} />
        <Route path="courses/add" element={<AddCourse />} />
        <Route path="courses/:id" element={<UpdateCourse />} />
        <Route path="course-modules/:id" element={<AddCourseModules />} />
        
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
