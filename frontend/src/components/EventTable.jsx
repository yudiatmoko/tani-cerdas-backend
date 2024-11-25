import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEvent, fetchData } from "../../services/eventApi";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const [data, setData] = useState([]); // Pastikan data diinisialisasi dengan array kosong
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchData(token);
        setData(fetchedData);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      try {
        await deleteEvent(id, token);  // Pastikan nama fungsi ini sesuai dengan yang ada di eventApi
        setData(data.filter((course) => course.id !== id));
        setSuccess("Course deleted successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      } catch (error) {
        setError("Failed to delete the course");
        setTimeout(() => {
          setError("");
        }, 2500);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading && <Alert message="Loading..." type="loading" />}
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      {/* Cek apakah data sudah tersedia */}
      {!loading && !error && data.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          Tidak ada data tersedia.
        </div>
      )}
      {data.length > 0 && (
        <table className="table-auto w-full">
          <thead className="bg-primary-75 text-primary-600 text-base font-normal">
            <tr className="h-12">
              <th className="px-3 py-2">Id</th>
              <th className="px-3 py-2">Nama Kursus</th>
              <th className="px-3 py-2">Jumlah Modul</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr
                key={course.id}
                className="h-12 text-left border-b border-primary-300"
              >
                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                  {course.id}
                </td>
                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                  {course.title}
                </td>
                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                  {course.modules_num || "Tidak tersedia"}
                </td>
                <td className="text-center text-sm font-bold px-10">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/course-modules/${course.id}`)}
                      className="bg-blue-500 p-2 rounded-md text-white"
                    >
                      Modul
                    </button>
                    <button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="bg-green-500 p-2 rounded-md text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
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
  );
};

export default CourseTable;
