import React from "react";
import EducationHeader from "../components/EducationHeader";
import { useNavigate } from "react-router-dom";
import CourseTable from "../components/CourseTable";

const Course = () => {
  const navigate = useNavigate();
  return (
    <>
        <EducationHeader
          title="Daftar Kursus"
          onclick={() => navigate("/courses/add")}
        />
        <CourseTable />
    </>
  );
};

export default Course;
