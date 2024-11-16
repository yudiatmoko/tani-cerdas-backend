import React from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}
