import Horoscope from "../../backend/horoscope.js";

/**
 * Upon page load, call the init() function
 */
window.addEventListener('DOMContentLoaded', init);

async function init() {
   const [theme, mood, advice] = Horoscope.generateReadingFromCurrentUser()

   const items = document.querySelectorAll(".item-container")
   const labels = ["Theme", "Mood", "Advice"]
   const values = [theme, mood, advice]

   for (let i = 0; i < labels.length; i++) {
      const label = items[i].querySelector(".item-label")
      const text = items[i].querySelector(".item-text")

      label.textContent = labels[i]
      text.textContent = values[i]
   }

   const userData = JSON.parse(localStorage.getItem('tarotUserInfo'))
   const sign = Horoscope.getHoroscope(Horoscope.getDate(userData.dob))
   const signText = document.querySelector(".sign-text")
   signText.textContent = sign

   document.querySelector("#username").textContent = `Hi ${userData.name}! Here's today's horoscope reading:`
}