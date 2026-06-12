import { useState } from "react";

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 3) {
      setMessage("❌ Name must be at least 3 characters");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setMessage("❌ Enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setMessage("❌ Phone number must be 10 digits");
      return;
    }

    setLoading(true);
    setMessage("Submitting...");

    const data = {
      ...formData,
      course_id: 1,
      source_id: 2,
      priority: "high",
      notes: "From React UI",
    };

    try {
      const response = await fetch(
        "https://backend-leads-rgut.onrender.com/api/createLead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Lead Submitted Successfully");

        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      } else {
        setMessage(`❌ ${result.message || "Error occurred"}`);
      }
    } catch (error) {
      setMessage("❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>🎓 Student Registration Form</h2>

      <p className="subtitle">
        Fill your details and our team will contact you.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register Now"}
        </button>

        <button
          type="button"
          className="reset-btn"
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
            });
            setMessage("");
          }}
        >
          Reset
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LeadForm;