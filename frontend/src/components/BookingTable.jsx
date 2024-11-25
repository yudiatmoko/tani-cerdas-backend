import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchData, deleteBooking } from "../../services/bookingApi";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const BookingTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const fetchedData = await fetchData(token);
                setData(fetchedData);
            } catch (error) {
                setError("Error fetching data booking");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure want to delete this booking?"
        );
        if (confirmDelete) {
            const token = localStorage.getItem("token");
            try {
                await deleteBooking(id, token);
                setData(data.filter((booking) => booking.id !== id));
                setSuccess("Booking deleted succesfully");
                setTimeout(() => {
                    setSuccess("");
                }, 2500);
            } catch (error) {
                setError("Failed to delete booking");
                setTimeout(() => {
                    setError("");
                }, 2500);
            }
        }
    }

    return(
        <div className="overflow-x-auto">
            {loading && <Alert message="Loading..." type="loading" />}
            {error &&<Alert message={error} type="error"/>}
            {success &&<Alert message={success} type="success"/>}
            {!loading && !error && data.length === 0 &&(
                <div className="text-center py-4 text-gray-500">
                    Tidak ada data tersedia.
                </div>
            )}
            {data.length > 0 &&(
                <table className="table-auto w-full">
                    <thead className="">
                        <tr className="h-12">
                            <th className="px-3 py-2">Id</th>
                            <th className="px-3 py-2">Nama pakar</th>
                            <th className="px-3 py-2">Nama user</th>
                            <th className="px-3 py-2">Tanggal</th>
                            <th className="px-3 py-2">Jam</th>
                            <th className="px-3 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((booking) => (
                            <tr
                                key={booking.id}
                                className="h-12 text-left border-b border-primary-300"
                            >
                                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                                    {booking.id}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {booking.u1.name}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {booking.u2.name}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {booking.date}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {booking.time}
                                </td>
                                    <div className="flex gap-2 justify-center">
                                        <button
                                        onClick={() => navigate(`/booking/${booking.id}`)}
                                        className="bg-green-500 p-2 rounded-md text-white"
                                        >
                                            EDIT
                                        </button>
                                        <button
                                        onClick={() => handleDelete(booking.id)}
                                        className="bg-red-500 p-2 rounded-md text-white"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </button>

                                    </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingTable;