import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../services/redux/features/sidebar";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

export const DashboardContext = createContext({});

export default function Layout({ children, className = '', contentClassName = '' }) {
  const sidebarVisible = useSelector(state => state.sidebar);
  const dispatch = useDispatch();

  const setSidebarVisibility = (visible) => {
    if (typeof visible === 'function') {
      visible = visible(sidebarVisible);
    }
    dispatch(toggleSidebar(visible));
  }

  className = ['h-screen', 'overflow-hidden', 'flex', 'flex-col', className].join(' ');

  const onClickOutsideMobileSidebar = () => {
    const maxMobileScreenSize = 768;
    if (window.innerWidth > maxMobileScreenSize) return;
    setSidebarVisibility(false)
  }

  // useEffect(() => {
  //   console.log('sidebarVisible', sidebarVisible)
  // }, [sidebarVisible]);

  return (
    <DashboardContext.Provider
      value={{ sidebarVisible, setSidebarVisibility }}
      className={className}
    >
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div
          onClick={onClickOutsideMobileSidebar}
          id="content"
          className={`
          ${contentClassName}
          ${sidebarVisible === true ? 'md:ml-52 lg:ml-64' : 'md:ml-16 '}
          overflow-y-auto overflow-x-hidden p-4 flex-grow
          transition-all
        `}
          style={{ maxHeight: 'calc(100vh - 64px)' }}
        >
          {children}
        </div>
      </div>
    </DashboardContext.Provider>
  )
}