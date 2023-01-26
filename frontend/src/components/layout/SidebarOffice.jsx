
import SidebarMenu from "../sidebar/SidebarMenu";
import { MdOutlineDashboard } from 'react-icons/md';
import { HiOutlineDownload } from 'react-icons/hi';
import { FaHandHoldingWater } from 'react-icons/fa';
import { RiInkBottleFill } from 'react-icons/ri';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCalculator,
} from 'react-icons/ai';

export default function SidebarOffice() {

  const menus = [
    {
      id: 'homepage',
      to: '/office/dashboard-office',
      label: 'หน้าแรก',
      icon: (props) => <AiOutlineHome {...props} />,
    },
    // {
    //   id: 'tracking',
    //   to: '/tracking-device',
    //   label: 'ติดตามอุปกรณ์',
    //   icon: (props) => <AiOutlineUser {...props} />,
    // },
    // {
    //   id: 'report',
    //   to: '/report-office',
    //   label: 'รายงานผลการปฏิบัติงาน',
    //   icon: (props) => <HiOutlineDownload {...props} />,
    // },
   
    {
      id: 'report',
      label: 'รายงานผลการปฏิบัติงาน',
      icon: (props) => <HiOutlineDownload {...props} />,
      dropdown: {
        id: 'reportDropdown',
        pathnamePrefix: '/office',
        children: [
          {
            id: 'officeCheck',
            to: '/office/report-check',
            label: 'รอการตรวจสอบ',
            icon: (props) => <MdOutlineDashboard {...props} />,
          },
          {
            id: 'officeProcess',
            to: '/office/report-process',
            label: 'กระบวนฆ่าเชื้อ',
            icon: (props) => <MdOutlineDashboard {...props} />,
          },
          {
            id: 'officeSuccess',
            to: '/office/report-success',
            label: 'ฆ่าเชื้อสำเร็จ',
            icon: (props) => <MdOutlineDashboard {...props} />,
          },
        ],
      },
    },
  ];

  return (
    <SidebarMenu data={menus} />
  )
}