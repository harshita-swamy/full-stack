import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import LeadsPage from "../pages/Leads/LeadsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<LeadsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        {/* Add other module pages here as they're built, e.g.: */}
        {/* <Route path="/students" element={<StudentsPage />} /> */}
      </Route>
    </Routes>
  );
}