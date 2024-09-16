import { postTasks } from "../api/task.fetch";

export const homePage = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "flex-col", "items-center", "justify-center", "min-h-screen", "bg-gray-100");

  const title = document.createElement("h1");
  title.classList.add("text-4xl", "font-bold", "mb-6");
  title.textContent = "Home Page";

  const card = document.createElement("div");
  card.classList.add("bg-white", "p-6", "rounded-lg", "shadow-lg", "w-full", "max-w-sm", "mb-4", "border-gray-300");

  const form = document.createElement("form");
  form.classList.add("w-full", "mb-4");

  const labelTitle = document.createElement("label");
  labelTitle.textContent = "Title:";
  labelTitle.classList.add("block", "mb-2");

  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.placeholder = "New Task";
  inputTitle.classList.add("border", "border-gray-300", "p-2", "mb-2", "w-full");

  const labelCompleted = document.createElement("label");
  labelCompleted.classList.add("flex", "items-center", "mb-2");

  const inputCompleted = document.createElement("input");
  inputCompleted.type = "checkbox";
  inputCompleted.classList.add("mr-2");

  labelCompleted.appendChild(inputCompleted);
  labelCompleted.appendChild(document.createTextNode("Completed"));

  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.classList.add("bg-green-500", "text-white", "px-4", "py-2", "rounded", "hover:bg-green-600", "ml-auto", "block");
  btnSubmit.textContent = "Add Task";

  form.appendChild(labelTitle);
  form.appendChild(inputTitle);
  form.appendChild(labelCompleted);
  form.appendChild(btnSubmit);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = {
      title: inputTitle.value,
      completed: inputCompleted.checked,
    };
    postTasks(task);
    // Reiniciar valores del formulario
    inputTitle.value = "";
    inputCompleted.checked = false;
  });

  card.appendChild(form);

  const btnLogout = document.createElement("button");
  btnLogout.classList.add("bg-red-500", "text-white", "px-4", "py-2", "rounded", "hover:bg-red-600");
  btnLogout.textContent = "Logout";

  btnLogout.addEventListener("click", async () => {
    const response = await fetch("http://localhost:4000/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.pathname = "/";
    }
  });

  const btnTodos = document.createElement("button");
  btnTodos.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded", "hover:bg-blue-600");
  btnTodos.textContent = "View todos";

  btnTodos.addEventListener("click", () => {
    window.location.pathname = "/todos";
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "justify-evenly", "w-1/4", "mt-4");

  buttonContainer.appendChild(btnTodos);
  buttonContainer.appendChild(btnLogout);

  container.appendChild(title);
  container.appendChild(card);
  container.appendChild(buttonContainer);

  return container;
};