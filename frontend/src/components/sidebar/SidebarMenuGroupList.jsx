import React, { useContext } from 'react'
import { DashboardContext } from '../../layouts/Layout';
import SidebarMenuItem from './SidebarMenuItem'

export default function SidebarMenuGroupList({
  label,
  icon: btnIcon,
  dropdown,
  toggleDropdownVisibility,
  dropdownVisible,
  getLinkClass,
  dropdownRefs,
}) {
  const { sidebarVisible } = useContext(DashboardContext);

  return (
    <li>
      <button
        onClick={() => toggleDropdownVisibility(dropdown.id)}
        type="button"
        className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 [group]`}
        aria-controls={dropdown.id}
        data-collapse-toggle={dropdown.id}
      >
        {btnIcon({ className: "w-5 h-5 min-h-[20px] min-w-[20px] text-gray-500 transition dark:text-gray-400 dark:group-hover:text-white" })}
        <span className={`z-10 left-0 relative ml-3 pr-1 py-0 truncate transition-opacity leading-tight ${sidebarVisible === true ? '' : 'md:invisible md:group-hover:visible'}`}>{label}</span>
        <svg className={`${dropdownVisible[dropdown.id] ? "transform rotate-180" : ""} right-1.5 static transition w-4 h-4 min-h-[16px] min-w-[16px]`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      <ul
        id={dropdown.id}
        ref={ref => (dropdownRefs.current[dropdown.id] = ref)}
        data-pathname-prefix={dropdown.pathnamePrefix}
        className={
          `${dropdownVisible[dropdown.id] ? "block" : "hidden"}
          ${sidebarVisible === true ? 'pl-6 md:pl-4 lg:pl-6' : 'pl-0 md:group-hover:pl-4 lg:group-hover:pl-6'}
          transition-all
        `}
      >
        {dropdown.children.map(({ id, icon: SubMenuIcon, label: subMenuLabel, to }) => (
          <SidebarMenuItem
            key={id}
            icon={SubMenuIcon}
            label={subMenuLabel}
            getLinkClass={getLinkClass}
            to={to}
          />
        ))}
      </ul>
    </li>
  )
}
