document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    // Grab values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const dd = form
      .querySelector('.dob-fields input:nth-child(1)')
      .value.trim();
    const mm = form
      .querySelector('.dob-fields input:nth-child(2)')
      .value.trim();
    const yyyy = form
      .querySelector('.dob-fields input:nth-child(3)')
      .value.trim();
    const mbti = document.getElementById('mbti').value;

    // Basic validation
    if (!username || !password || !dd || !mm || !yyyy || !mbti) {
      alert('Please fill out all fields.');
      return;
    }

    if (!/^\d{2}$/.test(dd) || parseInt(dd) < 1 || parseInt(dd) > 31) {
      alert('Please enter a valid day (DD).');
      return;
    }

    if (!/^\d{2}$/.test(mm) || parseInt(mm) < 1 || parseInt(mm) > 12) {
      alert('Please enter a valid month (MM).');
      return;
    }

    if (
      !/^\d{4}$/.test(yyyy) ||
      parseInt(yyyy) < 1900 ||
      parseInt(yyyy) > new Date().getFullYear()
    ) {
      alert('Please enter a valid year (YYYY).');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // Everything passed ✅
    alert('Sign up successful!');

    // Optionally redirect:
    // window.location.href = "home.html";
  });
});
