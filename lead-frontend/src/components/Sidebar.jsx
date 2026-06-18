import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/leads", label: "Leads" },
  { to: "/students", label: "Students" },
  { to: "/batches", label: "Batches" },
  { to: "/attendance", label: "Attendance" },
  { to: "/payments", label: "Payments" },
  { to: "/certificates", label: "Certificates" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">CRM</div>
      <nav className="sidebar-nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}