const API_BASE = "http://localhost:3115/api";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const getAllLeads = async () => {
  const res = await fetch(`${API_BASE}/getAllLeads`);
  const data = await handleResponse(res);
  return Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
};

export const createLead = async (payload) => {
  const res = await fetch(`${API_BASE}/createLead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updateLeadStatus = async (id, status_id) => {
  const res = await fetch(`${API_BASE}/updateLead/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status_id }),
  });
  return handleResponse(res);
};

export const deleteLead = async (id) => {
  const res = await fetch(`${API_BASE}/deleteLead/${id}`, { method: "DELETE" });
  return handleResponse(res);
};