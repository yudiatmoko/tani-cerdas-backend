import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchEvents, deleteEvent } from "../../services/eventApi";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const EventTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const getData = async () => {
        setLoading(true);
        try {
            const fetchedData = await fetchEvents(token);
            setData(fetchedData);
        } catch (error) {
            console.error(error);  // Log the actual error
            setError("Error fetching event data");
        } finally {
            setLoading(false);
        }
    };
    

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            try {
                await deleteEvent(id, token);
                setData(data.filter((event) => event.id !== id));
                setSuccess("Event deleted successfully");
                setTimeout(() => {
                    setSuccess("");
                }, 2500);
            } catch (error) {
                setError("Failed to delete the event");
                setTimeout(() => {
                    setError("");
                }, 2500);
            }
        }
    };

    return (
        <div className="overflow-x-auto">
            {loading && <Alert message="Loading..." type="loading" />}
            {error && <Alert message={error} type="error" />}
            {success && <Alert message={success} type="success" />}
            {!loading && !error && data.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    Tidak ada data tersedia.
                </div>
            )}
            {data.length > 0 && (
                <table className="table-auto w-full">
                    <thead className="bg-primary-75 text-primary-600 text-base font-normal">
                        <tr className="h-12">
                            <th className="px-3 py-2">Id</th>
                            <th className="px-3 py-2">Judul</th>
                            <th className="px-3 py-2">Deskripsi</th>
                            <th className="px-3 py-2">Tanggal</th>
                            <th className="px-3 py-2">Lokasi</th>
                            <th className="px-3 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((event) => (
                            <tr
                                key={event.id}
                                className="h-12 text-left border-b border-primary-300"
                            >
                                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                                    {event.id}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {event.title}
                                </td>
                                <td className="text-left text-sm text-gray-700 px-3 py-2">
                                    {event.description}
                                </td>
                                <td className="text-left text-sm font-medium text-gray-700 px-3 py-2">
                                    {event.date}
                                </td>
                                <td className="text-left text-sm font-medium text-gray-700 px-3 py-2">
                                    {event.location}
                                </td>
                                <td className="text-center text-sm font-bold px-10">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => navigate(`/events/${events.id}`)}
                                            className="bg-green-500 p-2 rounded-md text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="bg-red-500 p-2 rounded-md text-white"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EventTable;
