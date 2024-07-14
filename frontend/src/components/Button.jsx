/* eslint-disable react/prop-types */

export default function Button({ children, onClick, type = "primary" }) {
  return (
    <button
      onClick={onClick}
      className={`${
        type === "primary" ? "bg-neutral-950" : "bg-green-500"
      } text-neutral-100 rounded-md p-3 font-medium`}
    >
      {children}
    </button>
  );
}
