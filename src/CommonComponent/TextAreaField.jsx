// components/form/TextareaField.js
export const TextareaField = ({ label, register, name, required, errors }) => (
  <div className="w-full">
  {console.log(errors[name])}
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={name}
    >
      {label} <span className="required: text-red-500">*</span>
    </label>{" "}
    <textarea
      rows={4}
      {...register(name, { required })}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        errors[name] ? "border-red-500" : "border-gray-300"
      }`}
    ></textarea>
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors?.message?.message} is required</p>
    )}
  </div>
);
