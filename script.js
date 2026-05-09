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
    const API = "https://backend-leads-rgut.onrender.com";
    const response = await fetch(`${API}/api/createLead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {  
      messageBox.innerHTML = "✅ Lead Submitted Successfully";
      document.getElementById("leadForm").reset();
    } else {
      messageBox.innerHTML = "❌ " + (result.message || "Error occurred");
    }

  } catch (err) {
    console.error(err);  
    messageBox.innerHTML = "❌ Server Error";
  }
});