import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchData, deleteModule } from "../../services/moduleApi";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const ModuleTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this module?"
    );
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      try {
        await deleteModule(id, token);
        setData(data.filter((module) => module.id !== id));
        setSuccess("Module deleted successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      } catch (error) {
        setError("Failed to delete the module");
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
              <th className="px-3 py-2">Nama Modul</th>
              <th className="px-3 py-2">Jumlah Submodul</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((module) => (
              <tr
                key={module.id}
                className="h-12 text-left border-b border-primary-300"
              >
                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                  {module.id}
                </td>
                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                  {module.title}
                </td>
                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                  {module.submodules_num || "Tidak tersedia"}
                </td>
                <td className="text-center text-sm font-bold px-10">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/modules/${module.id}`)}
                      className="bg-green-500 p-2 rounded-md text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/modules/detail/${module.id}`)}
                      className="bg-gray-400 p-2 rounded-md text-white"
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => handleDelete(module.id)}
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

export default ModuleTable;
