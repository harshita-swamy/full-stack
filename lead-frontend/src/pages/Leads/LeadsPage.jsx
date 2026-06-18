import { useEffect, useState, useCallback } from "react";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import LeadForm from "./LeadForm";
import { getAllLeads, updateLeadStatus, deleteLead } from "../../api/leadApi";
import "./LeadsPage.css";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusInputs, setStatusInputs] = useState({});

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllLeads();
      setLeads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = (id, value) => {
    setStatusInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusUpdate = async (id) => {
    const value = statusInputs[id];
    if (value === undefined || value === "") return;
    try {
      await updateLeadStatus(id, Number(value));
      fetchLeads();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ye lead delete karna hai?")) return;
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const columns = [
    { key: "id", header: "ID", render: (row) => `#${row.id}` },
    { key: "person_id", header: "Person", render: (row) => `Person #${row.person_id}` },
    { key: "course_id", header: "Course" },
    { key: "source_id", header: "Source" },
    {
      key: "priority",
      header: "Priority",
      render: (row) => (
        <span className={`priority-badge priority-${row.priority || "low"}`}>
          {row.priority || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <div className="status-cell">
          {/* TODO: replace with <select> once leadStatuses GET route is shared */}
          <input
            type="number"
            value={statusInputs[row.id] ?? row.status_id ?? ""}
            onChange={(e) => handleStatusChange(row.id, e.target.value)}
            className="status-input"
          />
          <button onClick={() => handleStatusUpdate(row.id)} className="btn-sm">
            Set
          </button>
        </div>
      ),
    },
    { key: "notes", header: "Notes", render: (row) => row.notes || "-" },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <button onClick={() => handleDelete(row.id)} className="btn-link-danger">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="leads-page">
      <div className="leads-header">
        <div>
          <h1>Leads</h1>
          <p className="muted">{leads.length} total</p>
        </div>
        <button onClick={fetchLeads} className="btn-outline">
          Refresh
        </button>
      </div>

      <div className="card">
        <h2 className="card-title">Add a new lead</h2>
        <LeadForm onCreated={fetchLeads} />
      </div>

      <div className="card">
        {loading ? (
          <Loader text="Loading leads..." />
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <Table columns={columns} data={leads} emptyText="Koi lead nahi hai abhi." />
        )}
      </div>
    </div>
  );
}