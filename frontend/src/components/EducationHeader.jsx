import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";

const Header = (props) => {
  const { title, onclick } = props;

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={onclick}
          className="flex items-center bg-primary-500 text-white px-4 py-2 rounded-full"
        >
          <AddCircleIcon fontSize="small" className="mr-2" /> Tambah
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder={"Cari nama..."}
            className="border-2 border-primary-500 rounded-full px-4 py-2"
          />
          <ClearIcon
            fontSize="small"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
