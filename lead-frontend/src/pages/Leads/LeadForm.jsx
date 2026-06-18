import { useState } from "react";
import { createLead } from "../../api/leadApi";
import "./LeadForm.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  course_id: "",
  source_id: "",
  priority: "medium",
  notes: "",
};

export default function LeadForm({ onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createLead({
        ...form,
        course_id: Number(form.course_id),
        source_id: Number(form.source_id),
      });
      setForm(initialForm);
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form-grid">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          minLength={10}
          maxLength={15}
        />
        <input
          name="course_id"
          type="number"
          value={form.course_id}
          onChange={handleChange}
          placeholder="Course ID"
          required
        />
        <input
          name="source_id"
          type="number"
          value={form.source_id}
          onChange={handleChange}
          placeholder="Source ID"
          required
        />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
        rows={2}
      />
      <div className="lead-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Add lead"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>
    </form>
  );
}