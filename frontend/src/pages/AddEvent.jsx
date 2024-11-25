import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import { addEvent } from "../../services/eventApi"; // Assuming eventApi is correctly set up
import Spinner from "../components/Spinner";


const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    image_url: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setEventData({ ...eventData, image_url: image });
    setPreview(URL.createObjectURL(image));
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
      const response = await addEvent(formData, token); // Call the addEvent API instead of addCourse
      setSuccess(response.message);
      setEventData({
        title: "",
        description: "",
        event_date: "",
        location: "",
        image_url: null,
      });
      setPreview(null);
      setTimeout(() => {
        navigate("/events"); // Redirect to the events list page after success
      }, 2000);
    } catch (err) {
      if (err.response) {
        // Check if the response has data and errors
        setError(
          err.response.data?.errors
            ? err.response.data.errors[0]?.msg || "An error occurred"
            : "An unexpected error occurred"
        );
      } else {
        setError("Network error or server is down");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Tambah Event</h2>
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
            htmlFor="event_date"
            className="block text-base font-normal text-black"
          >
            Tanggal Event
          </label>
          <input
            type="datetime-local"
            name="event_date"
            id="event_date"
            value={eventData.event_date}
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
            Lokasi
          </label>
          <input
            placeholder="Masukkan lokasi event"
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
            required
          />
        </div>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
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
          {loading ? <Spinner /> : "Simpan"}
        </button>
      </form>
    </>
  );
};

export default AddEvent;
