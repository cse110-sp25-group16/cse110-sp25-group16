import Horoscope from '../../backend/horoscope.js';
import { generateImageHoroscope } from '../components/ExportButton.js';

/**
 * Upon page load, call the init() function
 */
window.addEventListener('DOMContentLoaded', init);

async function init() {
  const [theme, mood, advice] = Horoscope.generateReadingFromCurrentUser();
  const [themeExpanded, moodExpanded, adviceExpanded] =
    Horoscope.expandedReadingFromCurrentUser();

  const items = document.querySelectorAll('horoscope-card');
  console.log(items);
  const labels = ['Theme', 'Mood', 'Advice'];
  const values = [theme, mood, advice];
  const valuesExpanded = [themeExpanded, moodExpanded, adviceExpanded];

  for (let i = 0; i < labels.length; i++) {
    items[i].setAttribute('front-title', labels[i]);
    items[i].setAttribute('back-title', values[i]);
    items[i].setAttribute('back-desc', valuesExpanded[i]);
  }

  console.log(items);

  const userData = JSON.parse(localStorage.getItem('tarotUserInfo'));
  const sign = Horoscope.getHoroscope(Horoscope.getDate(userData.dob));
  const signText = document.querySelector('.sign-text');
  signText.textContent = sign;

  document.querySelector('#username').textContent = `Hi ${userData.name}!`;
  document.querySelector('#zodiac-picture').src =
    `../images/zodiacs/${sign}.png`;
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('generateHoroscopeBtn')
    .addEventListener('click', generateImageHoroscope);
});
