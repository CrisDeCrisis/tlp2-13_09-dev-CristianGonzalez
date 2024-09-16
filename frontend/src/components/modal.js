import { putTask } from "../api/task.fetch";

export const modalOverlay = (btnEdit, todo) => {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("fixed", "inset-0", "bg-gray-600", "bg-opacity-50", "flex", "items-center", "justify-center");
    modalOverlay.style.display = "none";

    const modalContent = document.createElement("div");
    modalContent.classList.add("bg-white", "p-6", "rounded-lg", "shadow-lg", "w-1/3");

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("text-xl", "font-bold", "mb-4");
    modalTitle.textContent = "Modificar tarea";

    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "task-title");
    labelTitle.classList.add("block", "text-sm", "font-medium", "text-gray-700", "mb-2");
    labelTitle.textContent = "Title:";

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("id", "task-title");
    inputTitle.classList.add("block", "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-indigo-500", "focus:border-indigo-500", "sm:text-sm");

    const labelCompletedContainer = document.createElement("div");
    labelCompletedContainer.classList.add("flex", "items-center", "mt-4");

    const labelCompleted = document.createElement("label");
    labelCompleted.setAttribute("for", "task-completed");
    labelCompleted.classList.add("text-sm", "font-medium", "text-gray-700", "mr-2");
    labelCompleted.textContent = "Completed:";

    const inputCompleted = document.createElement("input");
    inputCompleted.setAttribute("type", "checkbox");
    inputCompleted.setAttribute("id", "task-completed");
    inputCompleted.classList.add("h-4", "w-4", "text-indigo-600", "border-gray-300", "rounded", "focus:ring-indigo-500");

    labelCompletedContainer.appendChild(labelCompleted);
    labelCompletedContainer.appendChild(inputCompleted);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "justify-end", "mt-6");

    const btnSave = document.createElement("button");
    btnSave.setAttribute("id", "save-task");
    btnSave.classList.add("bg-green-600", "text-white", "px-4", "py-2", "rounded", "hover:bg-green-800", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-green-600");
    btnSave.textContent = "Actualizar";

    const btnCancel = document.createElement("button");
    btnCancel.setAttribute("id", "cancel-task");
    btnCancel.classList.add("ml-4", "bg-gray-500", "text-white", "px-4", "py-2", "rounded", "hover:bg-gray-700", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-gray-500");
    btnCancel.textContent = "Cancelar";

    buttonContainer.appendChild(btnSave);
    buttonContainer.appendChild(btnCancel);

    // Elementos del modal
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(labelTitle);
    modalContent.appendChild(inputTitle);
    modalContent.appendChild(labelCompletedContainer);
    modalContent.appendChild(buttonContainer);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    btnEdit.addEventListener("click", () => {
        modalOverlay.style.display = "flex";
        inputTitle.value = todo.title;
        inputCompleted.checked = todo.completed;
    });

    // Guardar cambios
    btnSave.addEventListener("click", () => {
        const title = inputTitle.value;
        const completed = inputCompleted.checked;
        putTask(todo.id, title, completed);
        modalOverlay.style.display = "none";
    });

    // Cancelar cambios
    btnCancel.addEventListener("click", () => {
        modalOverlay.style.display = "none";
    });

    return modalOverlay;
};