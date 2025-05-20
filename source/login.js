document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputName = document.getElementById("name").value.trim();
    const storedUser = JSON.parse(localStorage.getItem("tarotUserInfo"));

    if (!storedUser || !storedUser.name) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (storedUser.name.toLowerCase() === inputName.toLowerCase()) {
      alert(`Welcome back, ${storedUser.name}!`);
      localStorage.setItem("currentUser", storedUser.name);
    } else {
      alert("Name not recognized. Please try again or sign up.");
    }
  });
});
