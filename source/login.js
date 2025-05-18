document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      alert('Please enter both a username and password.');
      return;
    }


    const users = JSON.parse(localStorage.getItem('users')) || [];
    const match = users.find(user => user.username === username && user.password === password);

    if (match) {
      localStorage.setItem('currentUser', JSON.stringify({ username }));
      window.location.href = 'home.html';
    } else {
      alert('Incorrect username or password.');
    }
  });
});