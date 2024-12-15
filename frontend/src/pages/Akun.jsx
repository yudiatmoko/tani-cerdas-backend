import React from "react";
import EducationHeader from "../components/EducationHeader";
import { useNavigate } from "react-router-dom";
import AkunTable from "../components/AkunTable";

const Akun = () => {
  const navigate = useNavigate();
  return (
    <>
        <EducationHeader
          title="Detail Akun"
          
        />
        <AkunTable />
    </>
  );
};

export default Akun ;