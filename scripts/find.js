import { API_KEY } from "./api_key.js";

const baseUrl = "https://prakity.com/api/";

const messageEl = document.getElementById("message");
const findUsersBtn = document.getElementById("find-users-btn");
const usersTable = document
  .getElementById("users-table")
  .getElementsByTagName("tbody")[0];

findUsersBtn.addEventListener("click", async () => {
  console.log("find button clicked");

  const response = await fetch(baseUrl + "users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    messageEl.textContent = errorMessage;
    messageEl.classList.remove("success");
    messageEl.classList.add("error");
    return;
  }

  const users = await response.json();

  // Clear table content before populating with new data
  usersTable.innerHTML = "";

  // Update UI based on response data
  if (users.length === 0) {
    messageEl.textContent = "No users found.";
    messageEl.classList.add("warning"); // Consider using a warning class
    messageEl.classList.remove("success", "error");
  } else {
    users.forEach((user) => {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const emailCell = document.createElement("td");

      idCell.textContent = user.id;
      nameCell.textContent = user.name;
      emailCell.textContent = user.email;

      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);

      usersTable.appendChild(row);
    });
    messageEl.textContent = "Users found!";
    messageEl.classList.add("success");
    messageEl.classList.remove("error", "warning");
  }
});
