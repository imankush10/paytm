/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

export default function FooterWarning({linkText, linkRoute, children}) {
  return (
    <footer className="font-semibold text-lg text-center flex flex-col mt-4">
    <div className="mt-2">
      {children}{" "}
      <Link to={linkRoute} className="underline font-bold">
        {linkText}
      </Link>
    </div>
  </footer>
  )
}
