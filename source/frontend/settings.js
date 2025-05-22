document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('settings-form');

  document.getElementById('clearButton').addEventListener('click', clearData);

  // Pre-fill from localStorage
  const userDataRaw = localStorage.getItem('tarotUserInfo');
  if (userDataRaw) {
    const userData = JSON.parse(userDataRaw);
    document.getElementById('name').value = userData.name || '';
    document.getElementById('mbti').value = userData.mbti || '';

    const [dd, mm, yyyy] = (userData.dob || '').split('/');
    const [mmInput, ddInput, yyyyInput] =
      form.querySelectorAll('.dob-fields input');
    mmInput.value = mm || '';
    ddInput.value = dd || '';
    yyyyInput.value = yyyy || '';
  }

  const [mmInput, ddInput, yyyyInput] =
    form.querySelectorAll('.dob-fields input');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const mbti = document.getElementById('mbti').value.trim();
    const mm = mmInput.value.trim();
    const dd = ddInput.value.trim();
    const yyyy = yyyyInput.value.trim();

    if (!validateForm(name, mbti, dd, mm, yyyy)) return;

    //Save data in local storage
    const formattedDOB = `${dd.padStart(2, '0')}/${mm.padStart(2, '0')}/${yyyy}`;
    const userData = {
      name,
      dob: formattedDOB,
      mbti,
    };

    localStorage.setItem('tarotUserInfo', JSON.stringify(userData));
    alert('Settings saved!');
  });
});

function validateForm(name, mbti, dd, mm, yyyy) {
  if (!name || !mbti || !dd || !mm || !yyyy) {
    alert('Please fill out all fields.');
    return false;
  }

  if (!/^\d{2}$/.test(dd) || +dd < 1 || +dd > 31) {
    alert('Enter valid day (DD).');
    return false;
  }

  if (!/^\d{2}$/.test(mm) || +mm < 1 || +mm > 12) {
    alert('Enter valid month (MM).');
    return false;
  }

  const currentYear = new Date().getFullYear();
  if (!/^\d{4}$/.test(yyyy) || +yyyy < 1900 || +yyyy > currentYear) {
    alert('Enter valid year (YYYY).');
    return false;
  }

  // Real calendar validation using Date object
  const testDate = new Date(+yyyy, +mm - 1, +dd);
  if (
    testDate.getFullYear() !== +yyyy ||
    testDate.getMonth() !== +mm - 1 ||
    testDate.getDate() !== +dd
  ) {
    alert('Enter a valid date.');
    return false;
  }

  return true;
}

function clearData() {
  if (confirm('Clear all saved user data?')) {
    localStorage.removeItem('tarotUserInfo');
    document.getElementById('settings-form').reset();
  }
}
