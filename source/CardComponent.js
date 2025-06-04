class CardComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    wrapper.classList.add("card-wrapper");

    const card = document.createElement("div");
    card.classList.add("card");

    const image = this.getAttribute("image");
    const title = this.getAttribute("name");
    const arcana = this.getAttribute("arcana");
    const suit = this.getAttribute("suit");
    const uprightMeanings = JSON.parse(this.getAttribute("uprightMeanings"));
    const reversedMeanings = JSON.parse(this.getAttribute("reversedMeanings"));
    const keywords = JSON.parse(this.getAttribute("keywords"));
    const description = this.getAttribute("description");
    const numeral = this.getAttribute("numeral");

    card.innerHTML = `
         <div class="card-back">

         </div>
         <div class="card-front"> 
            <img src="${image}" alt="${title}"/>
            <h3>${numeral} - ${title} </h3>
            <strong>${arcana} - ${suit} </strong>
            <div class="keywords">
               Keywords: ${keywords.join(", ")}
            </div>
            <div>
               <h4>Upright Meanings:</h4>
               <ul>
                  ${uprightMeanings.map((item) => `<li>${item}</li>`).join("")}
               </ul>
            </div>
            <div>
               <h4>Reversed Meanings:</h4>
               <ul>
                  ${reversedMeanings.map((item) => `<li>${item}</li>`).join("")}
               </ul>
            </div>
            <p>${description}</p>
         </div>
      `;

    const style = document.createElement("style");
    style.textContent = `
         .card-wrapper {
            width: 250px;
            height: 400px;
            perspective: 1000px;
            cursor: pointer;
         }

         .card {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s;
         }

         .card.flip {
            transform: rotateY(180deg);
         }

         .card-front, .card-back {
            width: 100%;
            height: 100%;
            position: absolute;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            border-radius: 12px;
            background: white;
            overflow: auto;
            padding: 10px;
            box-sizing: border-box;
         }

         .card-back {
            background: url('/path/to/back-image.jpg') center/cover no-repeat;
         }

         .card-front {
            transform: rotateY(180deg);
         }

         img {
            max-width: 100px;
            margin-bottom: 10px;
         }

         h3 {
            margin: 5px 0;
         }

         p {
            font-size: 0.8rem;
         }

         .keywords {
            font-style: italic;
            font-size: 0.8rem;
            margin-top: 8px;
         }
      `;

    wrapper.appendChild(card);
    shadow.append(style, wrapper);

    wrapper.addEventListener("click", () => {
      card.classList.toggle("flip");
    });
  }
}

customElements.define("card-component", CardComponent);
