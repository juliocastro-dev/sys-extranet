import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const BtnDelete = ({ className, ...props }) => (
    <button
    className={`${className} inline-block px-3 py-2 bg-transparent border border-red-900 hover:bg-red-600 hover:text-white text-red-600 rounded-md cursor-pointer`}
    {...props}>
        <FaRegTrashAlt />
    </button>
)

export default BtnDelete;