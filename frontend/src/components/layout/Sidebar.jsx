
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

export default function Sidebar() {

  const menus = [
    {
      id: 'homepage',
      to: '/trackstatus/dashboard',
      label: 'หน้าแรก',
      icon: (props) => <AiOutlineHome {...props} />,
    },
    {
      id: 'tracking',
      to: '/trackstatus/tracking-device',
      label: 'ติดตามอุปกรณ์',
      icon: (props) => <AiOutlineUser {...props} />,
    },
    {
      id: 'report',
      to: '/trackstatus/report',
      label: 'รายงาน',
      icon: (props) => <HiOutlineDownload {...props} />,
    },
    // {
    //   id: 'report',
    //   label: 'รายงาน',
    //   icon: (props) => <HiOutlineDownload {...props} />,
    //   dropdown: {
    //     id: 'reportDropdown',
    //     pathnamePrefix: '/report',
    //     children: [
    //       {
    //         id: 'reportCost',
    //         to: '/report/cost',
    //         label: 'การคำนวณต้นทุน',
    //         icon: (props) => <MdOutlineDashboard {...props} />,
    //       },
    //       {
    //         id: 'reportPrice',
    //         to: '/report/price',
    //         label: 'การคำนวณราคา',
    //         icon: (props) => <MdOutlineDashboard {...props} />,
    //       },
    //       {
    //         id: 'reportProduct',
    //         to: '/report/product',
    //         label: 'Product Price List',
    //         icon: (props) => <MdOutlineDashboard {...props} />,
    //       },
    //       {
    //         id: 'reportService',
    //         to: '/report/service',
    //         label: 'Service Price List',
    //         icon: (props) => <MdOutlineDashboard {...props} />,
    //       },
    //       {
    //         id: 'reportCetificate',
    //         to: '/report/cetificate',
    //         label: 'Cetificate Price List',
    //         icon: (props) => <MdOutlineDashboard {...props} />,
    //       },
    //     ],
    //   },
    // },
  ];

  return (
    <SidebarMenu data={menus} />
  )
}