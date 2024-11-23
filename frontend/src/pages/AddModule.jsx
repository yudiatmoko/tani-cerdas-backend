import React, { useState } from "react";
import { addModule } from "../../services/moduleApi";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const SubmoduleForm = ({ submodule, index, onChange, onRemove }) => (
  <div className="space-y-2">
    <div>
      <label className="block text-base font-normal text-black">
        Nama Submodul
      </label>
      <input
        placeholder="Ketikkan judul submodul..."
        type="text"
        name="title"
        value={submodule.title}
        onChange={(e) => onChange(index, e)}
        className="w-full mt-1 p-2 border rounded-md border-primary-300"
        required
      />
    </div>
    <div>
      <label className="block text-base font-normal text-black">Isi</label>
      <textarea
        placeholder="Ketikkan isi..."
        name="content"
        value={submodule.content}
        onChange={(e) => onChange(index, e)}
        className="w-full min-h-56 mt-1 p-2 border rounded-md border-primary-300"
        required
      />
    </div>
    <div className="flex space-x-2">
      <button
        type="button"
        className="flex text-white items-center rounded-full bg-red-500 px-4 py-2"
        onClick={onRemove}
      >
        <ClearIcon fontSize="small" className="me-2" />
        Hapus
      </button>
    </div>
  </div>
);

const AddModule = () => {
  const [moduleData, setModuleData] = useState({
    title: "",
    submodules: [{ title: "", content: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleModuleChange = (e) => {
    setModuleData({ ...moduleData, [e.target.name]: e.target.value });
  };

  const handleSubmoduleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubmodules = [...moduleData.submodules];
    updatedSubmodules[index][name] = value;
    setModuleData({ ...moduleData, submodules: updatedSubmodules });
  };

  const addSubmodule = () => {
    setModuleData({
      ...moduleData,
      submodules: [...moduleData.submodules, { title: "", content: "" }],
    });
  };

  const removeSubmodule = (index) => {
    const updatedSubmodules = moduleData.submodules.filter(
      (_, i) => i !== index
    );
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
      const response = await addModule(moduleData, token);
      setSuccess(response.message);
      setModuleData({ title: "", submodules: [{ title: "", content: "" }] });
      setTimeout(() => {
        navigate("/modules");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.errors[0].msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Tambah Modul</h2>
      </div>
      <Alert message={error} type="error" />
      <Alert message={success} type="success" />
      {loading && <Alert message="Loading..." type="loading" />}

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-base font-normal text-black"
          >
            Nama Modul
          </label>
          <input
            placeholder="Ketikkan judul modul..."
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
          type="button"
          className="flex w-full justify-center items-center rounded-full bg-blue-500 px-4 py-2 text-white"
          onClick={addSubmodule}
        >
          <AddCircleIcon fontSize="small" className="me-2" />
          Tambah
        </button>
        <button
          type="submit"
          className={`w-full flex justify-center items-center mt-4 p-2 rounded-full text-white ${
            loading ? "bg-gray-400" : "bg-primary-500"
          }`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Simpan"}
        </button>
      </form>
    </>
  );
};

export default AddModule;
