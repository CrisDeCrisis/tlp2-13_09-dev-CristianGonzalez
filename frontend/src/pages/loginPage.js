export const loginPage = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "items-center", "justify-center", "min-h-screen", "bg-gray-100");

  const form = document.createElement("form");
  form.classList.add("bg-white", "p-6", "rounded-lg", "shadow-lg", "w-full", "max-w-sm");

  const title = document.createElement("h2");
  title.classList.add("text-2xl", "font-bold", "mb-4", "text-center");
  title.textContent = "Login form";

  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.id = "username";
  usernameInput.name = "username";
  usernameInput.required = true;
  usernameInput.classList.add("w-full", "p-2", "border", "border-gray-300", "rounded", "mb-4");
  usernameInput.placeholder = "Username";

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.required = true;
  passwordInput.name = "password";
  passwordInput.classList.add("w-full", "p-2", "border", "border-gray-300", "rounded", "mb-4");
  passwordInput.placeholder = "Password";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("w-full", "bg-blue-500", "text-white", "p-2", "rounded", "hover:bg-blue-600");
  submitButton.textContent = "Login";

  form.appendChild(title);
  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Validación básica
    if (!username || !password) {
      document.getElementById("message").innerText =
        "Por favor, completa todos los campos.";
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/sign-in", {
        method: "POST",
        credentials: "include", // Importante para enviar las cookies de sesión
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const divError = document.createElement("div");
        divError.innerText = "Credenciales inválidas";
        divError.classList.add("text-red-500", "mt-2");

        form.appendChild(divError);

        setTimeout(() => {
          divError.hidden = true;
        }, 3500);

        return;
      }

      const data = await response.json();
      console.log(data);
      window.location.pathname = "/home";
    } catch (error) { }
  });

  container.appendChild(form);

  return container;
};