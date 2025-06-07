
window.addEventListener('DOMContentLoaded', init);



async function init() {
   let active = "tarot"
   let date = Date.now()

   const tarotButton = document.getElementById("tarot")
   const horoscopeButton = document.getElementById("horoscope")
   const dateInput = document.getElementById("date")

   tarotButton.addEventListener("click", () => {
      active = "tarot"
   })

   horoscopeButton.addEventListener("click", () => {
      active = "horoscope"
   })

   dateInput.addEventListener("change", (e) => {
      date = e.target.value
   })

}

function getArchived(active, date) {
   if (active == "tarot") {


   } else {

      
   }
}