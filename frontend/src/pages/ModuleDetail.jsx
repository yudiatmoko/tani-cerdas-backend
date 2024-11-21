import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchModuleById } from "../../services/moduleApi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";

const ModuleDetail = () => {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const getModuleData = async () => {
        try {
          const token = localStorage.getItem("token");
          const data = await fetchModuleById(id, token);
          console.log(data);
          setModuleData(data);
        } catch (err) {
          setError("Error fetching module details.");
        } finally {
          setLoading(false);
        }
      };

      getModuleData();
    }, 1500);
  }, [id]);

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Detail Modul</h2>
      </div>
        {loading ? (
          <Alert message="Loading..." type="loading" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : null}

      {moduleData && (
        <div>
          <h3 className="text-lg font-bold">{moduleData.title}</h3>
          <h4 className="mt-4 font-semibold">Submodul</h4>
          <ul className="list-disc ml-5">
            {moduleData.submodules.map((submodule) => (
              <li key={submodule.id}>
                <strong>{submodule.title}</strong>: {submodule.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ModuleDetail;
