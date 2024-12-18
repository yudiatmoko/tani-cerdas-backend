import React from "react";
import EventTable from "../components/EventTable";
import EducationHeader from "../components/EducationHeader";
import { useNavigate } from "react-router-dom";

const Events = () => {
    const navigate = useNavigate();
    return (
        <>
            <EducationHeader
                title="Daftar Events"
                onClick={() => navigate("/events/add")}
            />
            <EventTable />
        </>
    );
};

export default Events;
