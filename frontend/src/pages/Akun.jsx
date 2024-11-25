import React from "react";
import EducationHeader from "../components/EducationHeader";
import { useNavigate } from "react-router-dom";
import AkunTable from "../components/AkunTable";

const Course = () => {
  const navigate = useNavigate();
  return (
    <>
        <EducationHeader
          title="Detail Akun"
          onclick={() => navigate("/courses/add")}
        />
        <CourseTable />
    </>
  );
};

export default Course;