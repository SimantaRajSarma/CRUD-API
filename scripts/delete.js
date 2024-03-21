import { API_KEY } from "./api_key.js";

const baseUrl = "https://prakity.com/api/";

const messageEl = document.getElementById("message");
const deleteUserForm = document.getElementById("delete-user-form");

deleteUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Delte form submitted");
  const id = document.getElementById("delete-id").value;

  const response = await fetch(baseUrl + "users/", {
    method: "DELETE", // For deleting a user
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    messageEl.textContent = errorMessage;
    messageEl.classList.remove("success");
    messageEl.classList.add("error");
    return;
  }

  messageEl.textContent = "User deleted successfully!";
  messageEl.classList.add("success");
  messageEl.classList.remove("error");
});
