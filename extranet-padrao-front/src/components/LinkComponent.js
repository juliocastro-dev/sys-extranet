import Link from "next/link"

const LinkComponent = ({ className, ...props }) => (
    <Link
        className={`${className}    
        inline-grid 
        text-center 
        items-center 
        px-4 
        py-2 
        bg-transparent
        border 
        border-black 
        rounded-md 
        font-semibold 
        text-xs 
        text-black 
        uppercase 
        tracking-widest 
        hover:bg-black 
        hover:text-white
        active:bg-black 
        focus:outline-none 
        focus:border-gray-900 
        focus:ring 
        ring-gray-300 
        disabled:opacity-25 
        transition 
        ease-in-out 
        duration-150`}
        {...props}
    />
)

export default LinkComponent
