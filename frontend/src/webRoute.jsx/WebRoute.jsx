import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardOffice from "../pages/officeHospital/DashboardOffice";
import ReportCheck from "../pages/officeHospital/ReportCheck";
// import ReportOffice from "../pages/office/ReportOffice";
import ReportProcess from "../pages/officeHospital/ReportProcess";
import ReportSuccess from "../pages/officeHospital/ReportSuccess";
import Dashboard from "../pages/trackstatus/Dashboard";
import Login from "../pages/trackstatus/Login";
import TrackingDetail from "../pages/trackstatus/TrackingDetail";
import TrackingDevice from "../pages/trackstatus/TrackingDevice";
import Report from './../pages/trackstatus/Report';
import DetailReport from './../components/layout/DetailReport';
import LoginDoc from '../pages/Document/LoginDoc';


export default function WebRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path='trackstatus'>
          <Route path="login-track" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tracking-device" element={<TrackingDevice />} />
          <Route path="tracking-detail" element={<TrackingDetail />} />
          <Route path="report" element={<Report />} />
          <Route path="report-detail" element={<DetailReport />} />
        </Route>
        <Route path='office'>
          <Route path="dashboard-office" element={<DashboardOffice />} />
          {/* <Route path="report-office" element={<ReportOffice />} /> */}
          <Route path="report-check" element={<ReportCheck />} />
          <Route path="report-process" element={<ReportProcess />} />
          <Route path="report-success" element={<ReportSuccess />} />
        </Route>
        <Route path = 'Document'>
          <Route path="Login-Doc" element={<LoginDoc/>} />

        </Route>
      </Routes>
      {/* <Route path='' element={<HomePage userType={UserTypeEnum.despatcher.code} />}>
        <Route path='' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />

      </Route> */}
    </BrowserRouter>
  )
}