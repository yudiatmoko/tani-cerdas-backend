import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookingById, updateBookingStatus } from "../../services/bookingApi"; // Pastikan API sudah tersedia
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const UpdateBooking = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState({
    user_id: "",
    pakar_id: "",
    user_name: "", // Tambahkan ini jika diperlukan
    pakar_name: "",
    date: "",
    time: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  // Fetch booking data by ID
  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetchBookingById(id, token); // Fetch booking API
        setBookingData({
          user_id: response.user_id || "",
          pakar_id: response.pakar_id || "",
          user_name: response.user_name || "",
          pakar_name: response.pakar_name || "",
          date: response.date || "",
          time: response.time || "",
          status: response.status || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Gagal mengambil data booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // Default value jika kosong
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // Format "yyyy-MM-dd"
  };

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    window.scrollTo(0, 0);

    try {
      const token = localStorage.getItem("token");
      const updatedData = { ...bookingData };
      const response = await updateBookingStatus(id, updatedData, token); // Update booking API
      setSuccess(response.message);
      setTimeout(() => {
        navigate("/booking"); // Redirect ke halaman booking list
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui data booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Edit Booking</h2>
      </div>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      {loading && <Alert message="Loading ..." type="loading" />}

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="user_id" className="block text-base font-normal text-black">
            Nama User
          </label>
          <input
            type="text"
            name="user_id"
            id="user_id"
            value={bookingData.user_name ||""}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label htmlFor="pakar_id" className="block text-base font-normal text-black">
            Nama Pakar
          </label>
          <input
            type="text"
            name="pakar_id"
            id="pakar_id"
            value={bookingData.pakar_name || ""}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-base font-normal text-black">
            Tanggal
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formatDate(bookingData.date)}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-base font-normal text-black">
            Jam
          </label>
          <input
            type="time"
            name="time"
            id="time"
            value={bookingData.time}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-base font-normal text-black">
            Status Booking
          </label>
          <select
            name="status"
            id="status"
            value={bookingData.status}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          >
            <option value="" disabled>
              Pilih status...
            </option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

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

export default UpdateBooking;
