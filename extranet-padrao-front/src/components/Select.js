
const Select = ({disabled = false, className, arrayOption = [], children, ...props}) => (
    <select
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 overflow-hidden`}
        {...props}
    >
        {arrayOption.length > 0 && (
            arrayOption.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))
        ) || (
            children
        )}
    </select>
);

export default Select;
