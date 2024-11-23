import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchModuleById, updateModule } from "../../services/moduleApi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const SubmoduleForm = ({ submodule, index, onChange, onRemove }) => (
  <div className="space-y-2">
    <div>
      <label className="block text-base font-normal text-black">
        Nama Submodul
      </label>
      <input
        type="text"
        name="title"
        value={submodule.title}
        onChange={(e) => onChange(index, e)}
        className="w-full mt-1 p-2 border rounded-md border-primary-300"
        required
      />
    </div>
    <div>
      <label className="block text-base font-normal text-black">
        Isi Submodul
      </label>
      <textarea
        name="content"
        value={submodule.content}
        onChange={(e) => onChange(index, e)}
        className="w-full min-h-56 mt-1 p-2 border rounded-md border-primary-300"
        required
      />
    </div>
  </div>
);

const UpdateModule = () => {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState({
    title: "",
    submodules: [{ id: null, title: "", content: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModule = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetchModuleById(id, token);
        setModuleData(response);
      } catch (err) {
        setError(err.response?.data?.errors[0].msg);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  const handleModuleChange = (e) => {
    setModuleData({ ...moduleData, [e.target.name]: e.target.value });
  };

  const handleSubmoduleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubmodules = [...moduleData.submodules];
    updatedSubmodules[index][name] = value;
    setModuleData({ ...moduleData, submodules: updatedSubmodules });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    window.scrollTo(0, 0);

    try {
      const token = localStorage.getItem("token");
      const updatedData = {
        title: moduleData.title,
        submodules: moduleData.submodules.map((submodule) => ({
          id: submodule.id,
          title: submodule.title,
          content: submodule.content,
        })),
      };
      const response = await updateModule(id, updatedData, token);
      setSuccess(response.message);
      setTimeout(() => {
        navigate("/modules");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Edit Modul</h2>
      </div>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      {loading && <Alert message="Loading ..." type="loading" />}

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-base font-normal text-black"
          >
            Nama Modul
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={moduleData.title}
            onChange={handleModuleChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <h3 className="font-bold text-base text-black font-lg mt-4">
          Submodul
        </h3>
        {moduleData.submodules.map((submodule, index) => (
          <SubmoduleForm
            key={index}
            submodule={submodule}
            index={index}
            onChange={handleSubmoduleChange}
            onRemove={() => removeSubmodule(index)}
          />
        ))}
        <button
          type="submit"
          className={`w-full flex justify-center items-center mt-4 p-2 rounded-full text-white ${
            loading ? "bg-gray-400" : "bg-primary-500"
          }`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Simpan perubahan"}
        </button>
      </form>
    </>
  );
};

export default UpdateModule;
