interface Option {
  label: string;
  value: any;
}

interface SelectProps {
  name: string;
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  loading?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
  loading = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="p-3 border border-gray-300 bg-brand-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        disabled={loading} // disable if loading
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {loading ? (
          <option disabled>Loading options...</option>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default Select;
