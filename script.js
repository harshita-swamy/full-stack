document.getElementById("leadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const messageBox = document.getElementById("message");
  messageBox.innerHTML = "Submitting...";

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    course_id: 1,
    source_id: 2,
    priority: "high",
    notes: "From Form UI"
  };

  try {
    const res = await fetch("http://localhost:3115/api/createLead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      messageBox.innerHTML = "✅ Lead Created Successfully";
      document.getElementById("leadForm").reset();
    } else {
      messageBox.innerHTML = "❌ " + result.message;
    }

  } catch (err) {
    messageBox.innerHTML = "❌ Server Error";
  }
});