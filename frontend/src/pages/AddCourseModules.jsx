import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchData as fetchDataModules,
  fetchModuleById,
} from "../../services/moduleApi";
import { fetchCourseById as fetchDataCourseById } from "../../services/courseApi";
import {
  addCourseModules,
  deleteCourseModules,
  fetchCourseModulesById,
} from "../../services/courseModulesApi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import DeleteIcon from "@mui/icons-material/Delete";

const CourseModulesPage = () => {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [courseModules, setCourseModules] = useState([]);
  const [moduleTitles, setModuleTitles] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseById(id);
    fetchModules();
  }, [id]);

  const fetchCourseById = async (courseId) => {
    try {
      const response = await fetchDataCourseById(courseId, token);
      setCourse(response);
      fetchCourseModules(courseId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await fetchDataModules();
      setModules(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourseModules = async (courseId) => {
    try {
      const response = await fetchCourseModulesById(courseId, token);
      setCourseModules(response[0].modules);
      const titles = {};
      for (const courseModule of response[0].modules) {
        const title = await fetchModuleById(courseModule.module_id, token);
        titles[courseModule.module_id] = title.title;
      }
      setModuleTitles(titles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCourseModules = async () => {
    setLoading(true);
    try {
      const response = await addCourseModules(
        {
          course_id: course.id,
          module_id: [selectedModule],
        },
        token
      );
      fetchCourseModules(course.id);
      setSelectedModule("");
      setSuccess(response.message);
    } catch (error) {
      console.error(error.msg);
      setError(error.response?.data?.errors[0].msg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2500);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this module from the course?"
    );
    if (confirmDelete) {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await deleteCourseModules(id, token);
        setCourseModules(courseModules.filter((module) => module.id !== id));
        fetchCourseModules(course.id);
        setSuccess(response.message);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.errors[0].msg);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError("");
          setSuccess("");
        }, 2500);
      }
    }
  };

  const availableModules = modules.filter(
    (module) =>
      !courseModules.some(
        (courseModule) => courseModule.module_id === module.id
      )
  );

  return (
    <div className="w-full p-4">
      <div className="flex justify-start items-center mb-8">
        <ArrowBackIosIcon
          fontSize="medium"
          className="me-2 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-bold">Tambah Modul ke Kursus</h2>
      </div>

      <Alert message={error} type="error" />
      <Alert message={success} type="success" />
      {loading && <Alert message="Loading..." type="loading" />}

      {course && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Nama kursus: {course.title}</h3>
          <div className="mt-2 flex justify-start items-center gap-4">
            <label htmlFor="moduleSelect" className="flex">
              Pilih Modul:
            </label>
            <select
              id="moduleSelect"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="border border-primary-300 rounded p-2 min-w-40"
            >
              <option value="">---</option>
              {availableModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddCourseModules}
              className={`flex justify-center items-center px-4 py-2 rounded-full text-white ${
                loading ? "bg-gray-400" : "bg-primary-500"
              }`}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Simpan"}
            </button>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h3 className="font-semibold text-lg">
          Modul yang ditambahkan ke Kursus
        </h3>
        {courseModules.length == 0 && <p>Tidak ada modul yang ditambahkan.</p>}
        {courseModules.length > 0 && (
          <table className="table-auto w-full mt-4">
            <thead className="bg-primary-75 text-primary-600 text-base font-normal">
              <tr>
                <th className="px-3 py-2">Id Modul</th>
                <th className="px-3 py-2">Nama Modul</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {courseModules.map((courseModule) => (
                <tr
                  key={courseModule.id}
                  className="text-center border-b border-primary-300"
                >
                  <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                    {courseModule.module_id}
                  </td>
                  <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                    {moduleTitles[courseModule.module_id] || "Loading..."}
                  </td>
                  <td className="text-center text-sm font-bold py-2">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleDelete(courseModule.id)}
                        className="bg-red-500 p-2 rounded-md text-white"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CourseModulesPage;
