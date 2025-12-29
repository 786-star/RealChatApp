const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  className = "",
}) => {
  return (
    <div className="w-[90%] h-12.5 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]">
      {label && (
        <label
          htmlFor={id || name}
          className="text-lg font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={` ${className}`}
      />
    </div>
  );
};

export default Input;