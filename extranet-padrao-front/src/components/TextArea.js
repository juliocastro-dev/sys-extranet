const TextArea = ({ disabled = false, className, children, ...props }) => (
    <textarea 
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-2`}
        {...props}
    >
        {children}
    </textarea>
)

export default TextArea;