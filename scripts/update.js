import { API_KEY } from "./api_key.js";

const baseUrl = "127.0.0.1:8080";

const messageEl = document.getElementById("message");
const updateUserForm = document.getElementById("update-user-form");

updateUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Update form submit");
  const id = document.getElementById("update-id").value;
  const name = document.getElementById("update-name").value;
  const email = document.getElementById("update-email").value;

  const response = await fetch(baseUrl + "users/", {
    method: "PUT", // For updating a user
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ id, name, email }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    messageEl.textContent = errorMessage;
    messageEl.classList.remove("success");
    messageEl.classList.add("error");
    return;
  }

  const data = await response.json();
  messageEl.textContent = data.message;
  messageEl.classList.add("success");
  messageEl.classList.remove("error");

  // Clear the form after successful update
  updateUserForm.reset();
});
