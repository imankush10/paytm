/* eslint-disable react/prop-types */

export default function InputBox({
  label,
  type,
  placeholder,
  value,
  setValue,
  max,
}) {
  return (
    <div className="flex flex-col mb-1 gap-2">
      {label && <label className="text-xl font-bold">{label}</label>}
      <input
        className="border-[1px] border-neutral-500 rounded-md p-2 placeholder:font-semibold placeholder:text-lg text-lg font-semibold"
        placeholder={placeholder}
        type={type}
        value={value}
        max={max}
        required
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
