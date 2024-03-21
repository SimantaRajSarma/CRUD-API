import { API_KEY } from "./api_key.js";

const baseUrl = "https://prakity.com/api/";

const messageEl = document.getElementById("message");
const createUserForm = document.getElementById("create-user-form");

createUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("create form submitted");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const response = await fetch(baseUrl + "users/", {
    method: "POST", // For creating a user
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ name, email }),
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

  // Clear the form after successful creation
  createUserForm.reset();
});
