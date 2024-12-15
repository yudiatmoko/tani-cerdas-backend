import React, { useEffect, useState } from "react";
import { fetchData, updateAkunFields } from "../../services/akunapi";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AkunTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const fetchedData = await fetchData(token);
                console.log("Fetched data:", fetchedData);
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching akun data");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);



    return (
        <div className="overflow-x-auto">
            {loading && <Alert message="Loading..." type="loading" />}
            {error && <Alert message={error} type="error" />}
            {success && <Alert message={success} type="success" />}
            {!loading && !error && data.length === 0 && (
                <div className="text-center py-4 text-gray-500">Tidak ada data tersedia.</div>
            )}
            {data.length > 0 && (
                <table className="table-auto w-full">
                    <thead>
                        <tr className="h-12">
                            <th className="px-3 py-2">ID</th>
                            <th className="px-3 py-2 text-left">Nama</th>
                            <th className="px-3 py-2 text-left">Email</th>
                            <th className="px-3 py-2 text-left">Role</th>
                            <th className="px-3 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((akun) => (
                            <tr key={akun.id} className="h-12 text-left border-b border-primary-300">
                                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                                    {akun.id}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {akun.name}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {akun.email}
                                </td>
                                <td className="text-left text-sm font-bold text-gray-900 px-3 py-2">
                                    {akun.role}
                                </td>
                                <td className="text-center text-sm font-medium text-gray-700 px-3 py-2">
                                    <div className="flex gap-2 justify-center">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleEdit(akun.id)}
                                        >
                                            Edit
                                        </Button>
                                        <button
                                        onClick={() => handleDelete(akun.id)}
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

export default AkunTable;
