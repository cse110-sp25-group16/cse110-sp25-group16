document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const dd = document.getElementById("dob-day").value.trim();
    const mm = document.getElementById("dob-month").value.trim();
    const yyyy = document.getElementById("dob-year").value.trim();
    const mbti = document.getElementById("mbti").value;

    // Validation
    if (!name || !dd || !mm || !yyyy || !mbti) {
      alert("Please fill out all fields.");
      return;
    }

    if (!/^\d{2}$/.test(dd) || parseInt(dd) < 1 || parseInt(dd) > 31) {
      alert("Please enter a valid day (DD).");
      return;
    }

    if (!/^\d{2}$/.test(mm) || parseInt(mm) < 1 || parseInt(mm) > 12) {
      alert("Please enter a valid month (MM).");
      return;
    }

    if (
      !/^\d{4}$/.test(yyyy) ||
      parseInt(yyyy) < 1900 ||
      parseInt(yyyy) > new Date().getFullYear()
    ) {
      alert("Please enter a valid year (YYYY).");
      return;
    }

    // Save to localStorage
    const userData = {
      name,
      dob: `${dd}/${mm}/${yyyy}`,
      mbti,
    };

    localStorage.setItem("tarotUserInfo", JSON.stringify(userData));

    alert("Sign up successful!");

    window.location = "./index.html";
  });
});
