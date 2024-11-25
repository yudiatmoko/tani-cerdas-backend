import React, { useEffect, useState } from "react";
import { fetchAllAkun, updateAkunFields } from "../../services/akunapi";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AkunTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const fetchedData = await fetchAllAkun();
                setData(fetchedData);
            } catch (error) {
                setError("Error fetching akun data");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/akun/${id}/edit`); // Arahkan ke halaman edit
    };

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
                            <th className="px-3 py-2">Nama</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Role</th>
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
                                    {akun.title}
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
