import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import { fetchEventById, updateEvent } from "../../services/eventApi"; // Adjust the import path
import Spinner from "../components/Spinner";

const UpdateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
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
    const fetchEvent = async () => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const token = localStorage.getItem("token");
        const data = await fetchEventById(id, token); // Adjust this API call to fetch event data
        setEventData(data);
        if (data.image_url) {
          setPreviousImage(data.image_url);
        }
      } catch (err) {
        setError(err.response?.data?.errors[0].msg);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setEventData({ ...eventData, image_url: image });
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
    Object.keys(eventData).forEach((key) => {
      formData.append(key, eventData[key]);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await updateEvent(id, formData, token); // Call the API to update event data
      setSuccess(response.message);
      setTimeout(() => {
        navigate("/events");
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
        <h2 className="text-xl font-bold">Update Event</h2>
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
            Judul Event
          </label>
          <input
            placeholder="Ketikkan judul event..."
            type="text"
            name="title"
            id="title"
            value={eventData.title}
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
            Deskripsi Event
          </label>
          <textarea
            placeholder="Ketikkan deskripsi..."
            name="description"
            id="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full min-h-56 mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-base font-normal text-black"
          >
            Tanggal Event
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-base font-normal text-black"
          >
            Lokasi Event
          </label>
          <input
            placeholder="Contoh: Gedung Serbaguna, Kampus XYZ"
            type="text"
            name="location"
            id="location"
            value={eventData.location}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
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
          previousImage && (
            <div className="mt-4">
              <img
                src={`http://localhost:3002/images/${previousImage}`}
                alt="Previous"
                className="max-h-60 object-cover rounded-md"
              />
            </div>
          )
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

export default UpdateEvent;
