import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../../services/userApi"; // Pastikan API sudah tersedia
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const DetailAkun = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image_url: "",
    city: "",
    job: "",
    experience: "",
    institute: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetchUserDetails(token); // Fetch user details API
        setUserData(response);
      } catch (err) {
        setError(err.response?.data?.message || "Gagal mengambil data akun");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Detail Akun</h2>
      </div>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      {loading && <Alert message="Loading ..." type="loading" />}

      <div className="space-y-4">
        <div>
          <label className="block text-base font-normal text-black">Nama</label>
          <p className="p-2 border rounded-md">{userData.name || "N/A"}</p>
        </div>

        <div>
          <label className="block text-base font-normal text-black">Email</label>
          <p className="p-2 border rounded-md">{userData.email || "N/A"}</p>
        </div>

        <div>
          <label className="block text-base font-normal text-black">Kota</label>
          <p className="p-2 border rounded-md">{userData.city || "N/A"}</p>
        </div>

        <div>
          <label className="block text-base font-normal text-black">Pekerjaan</label>
          <p className="p-2 border rounded-md">{userData.job || "N/A"}</p>
        </div>

        <div>
          <label className="block text-base font-normal text-black">Pengalaman</label>
          <p className="p-2 border rounded-md">{userData.experience || "N/A"}</p>
        </div>

        <div>
          <label className="block text-base font-normal text-black">Institusi</label>
          <p className="p-2 border rounded-md">{userData.institute || "N/A"}</p>
        </div>

        <div>
          <label className="block text-base font-normal text-black">Rating</label>
          <p className="p-2 border rounded-md">{userData.rating || "N/A"}</p>
        </div>
      </div>
    </>
  );
};

export default DetailAkun;
