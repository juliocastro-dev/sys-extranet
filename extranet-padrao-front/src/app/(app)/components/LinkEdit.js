import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const LinkEdit = ({ className, ...props }) => (
    <Link 
    className={`${className} inline-block px-3 py-2 bg-transparent border border-green-900 hover:bg-green-600 hover:text-white text-green-600 rounded-md cursor-pointer`} 
    {...props}>
        <FaEdit />
    </Link>
)

export default LinkEdit;