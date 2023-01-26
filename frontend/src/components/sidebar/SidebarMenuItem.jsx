import { Link } from "react-router-dom";

export default function SidebarMenuItem({
  to,
  icon,
  label,
  getLinkClass
}) {
  return (
    <li>
      <Link
        to={to}
        className={`${getLinkClass(to)} flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700`}
      >
        {!icon ? '' : icon({ className: "w-5 h-5 min-h-[20px] min-w-[20px] text-gray-500 transition dark:text-gray-400 dark:group-hover:text-white" })}
        <span className={`z-10 left-0 relative ml-3 px-0 py-0 truncate leading-tight transition-opacity`} title={label}>{label}</span>
      </Link>
    </li>
  )
}