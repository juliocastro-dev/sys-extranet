import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

const LinkView = ({ className, ...props }) => (
    <Link 
    className={`${className} inline-block px-3 py-2 bg-transparent border border-blue-900 hover:bg-blue-600 hover:text-white text-blue-600 rounded-md cursor-pointer`} 
    {...props}>
        <FaEye />
    </Link>
)

export default LinkView;