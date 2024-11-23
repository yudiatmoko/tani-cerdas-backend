import React from "react";
import BookingTable from "../components/BookingTable";
import EducationHeader from "../components/EducationHeader";
import { useNavigate } from "react-router-dom";

const Booking = () => {
    const navigate = useNavigate();
    return (
        <>
            <EducationHeader
                title="Daftar Booking"
                onclick={() => navigate("/booking/add")}
            />
            <BookingTable />
        </>
    );
};

export default Booking;