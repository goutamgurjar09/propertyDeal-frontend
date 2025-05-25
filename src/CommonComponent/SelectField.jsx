export const SelectField = ({ label, register, name, options, error, placeholder }) => (
  <div>
   <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={name}
    >
      {label} <span className="required: text-red-500">*</span>
    </label>
    <select
      {...register(name)}
      className="w-full h-12 px-4 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);