import Horoscope from "../../backend/horoscope.js";

/**
 * Upon page load, call the init() function
 */
window.addEventListener("DOMContentLoaded", init);

async function init() {
  const [theme, mood, advice] = Horoscope.generateReadingFromCurrentUser();

  const items = document.querySelectorAll("horoscope-card");
  console.log(items);
  const labels = ["Theme", "Mood", "Advice"];
  const values = [theme, mood, advice];

  for (let i = 0; i < labels.length; i++) {
    items[i].setAttribute("front-title", labels[i]);
    items[i].setAttribute("back-title", values[i]);
  }

  console.log(items);

  const userData = JSON.parse(localStorage.getItem("tarotUserInfo"));
  const sign = Horoscope.getHoroscope(Horoscope.getDate(userData.dob));
  const signText = document.querySelector(".sign-text");
  signText.textContent = sign;

  document.querySelector("#username").textContent = `Hi ${userData.name}!`;
  // document.querySelector("#zodiac-picture").src = `../images/zodiacs/${sign}.png`;
  document.querySelector("#zodiac-picture").src = "../images/logo.png";
}
