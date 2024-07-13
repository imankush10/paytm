/* eslint-disable react/prop-types */

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-950 text-neutral-100 rounded-md p-3"
    >
      {children}
    </button>
  );
}
