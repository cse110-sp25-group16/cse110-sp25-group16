
window.addEventListener('DOMContentLoaded', init);


/**
 * Gets archived tarot/horoscope for particular date based on active state 
 */
async function init() {
   let active = "tarot"
   let date = Date.now()

   const tarotButton = document.getElementById("tarot")
   const horoscopeButton = document.getElementById("horoscope")
   const dateInput = document.getElementById("date")

   const updateActiveButton = () => {
      tarotButton.classList.remove("active")
      horoscopeButton.classList.remove("active")

      if (active === "tarot") {
         tarotButton.classList.add("active")
      } else {
         horoscopeButton.classList.add("active")
      }
   };

   tarotButton.addEventListener("click", () => {
      active = "tarot"
      updateActiveButton()
      getArchived(active, date)
   })

   horoscopeButton.addEventListener("click", () => {
      active = "horoscope"
      updateActiveButton()
      getArchived(active, date)
   })

   dateInput.addEventListener("change", (e) => {
      date = e.target.value
      getArchived(active, date)
   })

}

function getArchived(active, date) {
   if (active == "tarot") {


   } else {

      
   }
}