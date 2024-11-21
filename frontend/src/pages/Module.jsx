import React from "react";
import ModuleTable from "../components/ModuleTable";
import EducationHeader from "../components/EducationHeader";
import { useNavigate } from "react-router-dom";

const Module = () => {
  const navigate = useNavigate();
  return (
    <>
        <EducationHeader
          title="Module"
          onclick={() => navigate("/modules/add")}
        />
        <ModuleTable />
    </>
  );
};

export default Module;
