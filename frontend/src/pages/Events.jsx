import React from "react";
import EducationHeader from "../components/EducationHeader";
import { useNavigate } from "react-router-dom";
import EventTable from "../components/EventTable"; // Ganti dengan komponen tabel untuk Events

const Events = () => {
  const navigate = useNavigate();
  return (
    <>
      <EducationHeader
        title="Daftar Events" // Sesuaikan judul
        onclick={() => navigate("/events/add")} // Arahkan ke halaman tambah event
      />
      <EventTable /> {/* Ganti tabel dengan komponen EventTable */}
    </>
  );
};

export default Events;
