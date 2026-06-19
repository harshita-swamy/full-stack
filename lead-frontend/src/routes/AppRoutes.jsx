import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import LeadsPage from "../pages/Leads/LeadsPage";
import BatchList from "../pages/Batches/BatchList";
import AttendanceList from "../pages/Attendance/AttendanceList";
import PaymentList from "../pages/Payments/PaymentList";
import CertificateList from "../pages/Certificates/CertificateList";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/batches" element={<BatchList />} />
        <Route path="/attendance" element={<AttendanceList />} />
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/certificates" element={<CertificateList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;