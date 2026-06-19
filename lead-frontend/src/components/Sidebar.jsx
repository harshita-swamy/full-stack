import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">Dashboard</Link>
      <Link to="/leads">Leads</Link>
      <Link to="/batches">Batches</Link>
      <Link to="/attendance">Attendance</Link>
      <Link to="/payments">Payments</Link>
      <Link to="/certificates">Certificates</Link>
    </div>
  );
}

export default Sidebar;