import React, { useState } from "react";
import { addBooking } from "../../services/bookingApi"; // Pastikan API sudah tersedia
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const AddBooking = () => {
  const [bookingData, setBookingData] = useState({
    user_id: "",
    pakar_id: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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
      const response = await addBooking(bookingData, token); // Memanggil API booking
      setSuccess(response.message);
      setBookingData({ user_id: "", pakar_id: "", date: "", time: "" });
      setTimeout(() => {
        navigate("/booking"); // Redirect ke halaman booking list
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Tambah Booking</h2>
      </div>
      <Alert message={error} type="error" />
      <Alert message={success} type="success" />
      {loading && <Alert message="Loading..." type="loading" />}

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="user_id" className="block text-base font-normal text-black">
            User ID
          </label>
          <input
            placeholder="Masukkan ID user..."
            type="text"
            name="user_id"
            id="user_id"
            value={bookingData.user_id}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md border-primary-300"
            required
          />
        </div>

        <div>
          <label htmlFor="pakar_id" className="block text-base font-normal text-black">
            Pakar ID
          </label>
          <input
            placeholder="Masukkan ID pakar..."
            type="text"
            name="pakar_id"
            id="pakar_id"
            value={bookingData.pakar_id}
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
            value={bookingData.date}
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

export default AddBooking;
