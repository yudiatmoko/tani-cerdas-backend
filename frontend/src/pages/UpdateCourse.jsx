import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import { fetchCourseById, updateCourse } from "../../services/courseApi";
import Spinner from "../components/Spinner";

const UpdateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    video_url: "",
    duration: "",
    level: "",
    image_url: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const token = localStorage.getItem("token");
        const response = await fetchCourseById(id, token);
        setCourseData(response);
        if (response.image_url) {
          setPreviousImage(response.image_url);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error updating course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setCourseData({ ...courseData, image_url: image });
    setPreview(URL.createObjectURL(image));
    setPreviousImage(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    window.scroll(0, 0);

    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      formData.append(key, courseData[key]);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await updateCourse(id, formData, token);
      setSuccess(response.message);
      setTimeout(() => {
        navigate("/courses");
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
        <h2 className="text-xl font-bold">Update Kursus</h2>
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
            Judul Kursus
          </label>
          <input
            placeholder="Ketikkan judul kursus..."
            type="text"
            name="title"
            id="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-base font-normal text-black"
          >
            Deskripsi Kursus
          </label>
          <textarea
            placeholder="Ketikkan deskripsi..."
            name="description"
            id="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full min-h-56 mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="video_url"
            className="block text-base font-normal text-black"
          >
            URL Video
          </label>
          <input
            placeholder="www.example.com/"
            type="text"
            name="video_url"
            id="video_url"
            value={courseData.video_url}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-base font-normal text-black"
          >
            Durasi
          </label>
          <input
            placeholder="Contoh 120 (dalam menit)"
            type="number"
            name="duration"
            id="duration"
            value={courseData.duration}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-base font-normal text-black"
          >
            Level
          </label>
          <select
            name="level"
            id="level"
            value={courseData.level}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300 bg-white"
            required
          >
            <option value="">---</option>
            <option value="Pemula">Pemula</option>
            <option value="Menengah">Menengah</option>
            <option value="Mahir">Mahir</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="image_url"
            className="block text-base font-normal text-black"
          >
            Upload Gambar
          </label>
          <input
            type="file"
            name="image_url"
            id="image_url"
            onChange={handleFileChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300 bg-white"
            accept="image/jpeg, image/png"
          />
        </div>

        {preview ? (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-60 object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="mt-4">
            <img
              src={`https://tani-cerdas-backend.vercel.app/images/${previousImage}`}
              alt="Preview"
              className="max-h-60 object-cover rounded-md"
            />
          </div>
        )}

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

export default UpdateCourse;
