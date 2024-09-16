import { deleteTask, getAllTasks, putTask } from "../api/task.fetch";
import { modalOverlay } from "../components/modal";

export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add("p-4", "bg-gray-100", "min-h-screen");

  const btnHome = document.createElement("button");
  btnHome.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded", "float-right");
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-2xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");
  table.classList.add("min-w-full", "bg-white", "shadow-lg", "rounded-lg");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.classList.add("px-4", "py-2", "border");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("px-4", "py-2", "border");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("px-4", "py-2", "border");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("px-4", "py-2", "border");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("px-4", "py-2", "border");
  th5.textContent = "Actions";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");

  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(table);

  getAllTasks()
    .then(({ userTodos }) => {
      userTodos.forEach((todo) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("px-4", "py-2", "border");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("px-4", "py-2", "border");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("px-4", "py-2", "border");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("px-4", "py-2", "border");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("px-4", "py-2", "border");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("bg-indigo-500", "text-white", "px-2", "py-1", "rounded", "mr-2");
        btnEdit.textContent = "Edit";
        btnEdit.addEventListener("click", () => {
          const modal = modalOverlay(btnEdit, todo);
          document.body.appendChild(modal);
        });

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded");
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener("click", () => {
          deleteTask(todo.id)
            .then(() => {
              tbody.removeChild(tr);
            });
        });

        td5.appendChild(btnEdit);
        td5.appendChild(btnDelete);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tbody.appendChild(tr);
      });
    });

  return container;
};