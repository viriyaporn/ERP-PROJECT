import { useContext, useEffect, useRef, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { DashboardContext } from "../../layouts/Layout";
import SidebarMenuGroupList from "./SidebarMenuGroupList";
import SidebarMenuItem from "./SidebarMenuItem";

export default function SidebarMenu({ data = [] }) {
  const { sidebarVisible } = useContext(DashboardContext);
  const location = useLocation();
  const dropdownRefs = useRef({});
  const initialDropdowns = data.filter(menu => menu.dropdown).reduce((acc, menu) => ({ ...acc, [menu.dropdown.id]: false }), {});
  const [dropdownVisible, setDropdownVisibility] = useState(initialDropdowns);

  const links = {
    active: 'dark:bg-gray-700 bg-gray-200 dark:text-slate-300 text-black',
    default: '',
  }

  const getLinkClass = (pathname) => {
    const target = matchPath(pathname, location.pathname) ? 'active' : "default";
    return links[target];
  }

  const toggleDropdownVisibility = target => {
    setDropdownVisibility(prev => ({ ...prev, [target]: !dropdownVisible[target] }));
  }

  const setActiveLink = (el) => {
    if (location.pathname.startsWith(el.dataset.pathnamePrefix)) {
      toggleDropdownVisibility(el.id);
    }
  }

  useEffect(() => {
    if (!Object.keys(dropdownRefs.current).length) return;
    for (const key in dropdownRefs.current) {
      setActiveLink(dropdownRefs.current[key]);
    }
  }, [dropdownRefs]);

  return (
    <aside
      className={`
        ${sidebarVisible === true ? 'md:w-52 lg:w-64' : '-translate-x-full md:translate-x-0 md:w-[3.75rem] md:hover:w-52 lg:hover:w-64'}
        group z-10 whitespace-normal shadow-2xl transition-all duration-300 w-64
        overflow-y-auto absolute left-0
        bg-gray-50 dark:bg-gray-800`}
      aria-label="Sidebar"
      style={{ height: 'calc(100% - 65px)' }}>
      <ul className="space-y-2 absolute w-full py-4 px-3">
        {data.map(({ id, icon, label, to = null, dropdown = null }) => (
          dropdown ? (
            <SidebarMenuGroupList
              key={id}
              id={id}
              dropdown={dropdown}
              icon={icon}
              label={label}
              toggleDropdownVisibility={toggleDropdownVisibility}
              getLinkClass={getLinkClass}
              dropdownRefs={dropdownRefs}
              dropdownVisible={dropdownVisible}
            />
          ) : (
            <SidebarMenuItem
              key={id}
              icon={icon}
              label={label}
              to={to}
              getLinkClass={getLinkClass}
            />
          )
        ))}
      </ul>
    </aside>
  )
}