import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById } from "../../services/eventApi"; // Adjust the service import accordingly
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Alert from "../components/Alert";

const EventDetail = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getEventData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchEventById(id, token); // Call your API to fetch event data
        setEventData(data);
      } catch (err) {
        setError(err.response?.data?.errors[0].msg || "Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    getEventData();
  }, [id]);

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-8">
        <ArrowBackIosIcon fontSize="small" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Detail Event</h2>
      </div>

      {loading ? (
        <Alert message="Loading..." type="loading" />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : null}

      {eventData && (
        <div>
          <h3 className="text-lg font-bold">{eventData.title}</h3>
          <p className="mt-4">{eventData.description}</p>
          <p className="mt-4 font-semibold">Tanggal: {eventData.date}</p>
          <p className="font-semibold">Lokasi: {eventData.location}</p>

          {/* If the event has multiple sessions or sub-events */}
          {eventData.sessions && (
            <>
              <h4 className="mt-4 font-semibold">Sesi</h4>
              <ul className="list-disc ml-5">
                {eventData.sessions.map((session) => (
                  <li key={session.id}>
                    <strong>{session.title}</strong>: {session.time}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EventDetail;
