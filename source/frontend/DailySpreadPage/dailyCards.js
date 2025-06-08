/**
 * Card Component is a custom web component that creates a tarot-style card with a front/back flip animation
 * and collapsible subsections
 *
 * Attributes:
 * - image: string - URL to card image
 * - title: string - Name of card
 * - arcana: string - Arcana type
 * - suit: string - Suit of card
 * - uprightMeanings: JSON encoded array of strings - meanings of card
 * - reversedMeanings: JSON encoded array of strings - reversed meanings of card
 * - keywords: JSON encoded array of strings - keywords for card
 * - description: string - Description of card
 * - numeral: string - Numeral of card
 */

class CardComponent extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * The connectedCallback method is called after the element is attached to the DOM.
   * This is so that we can set the attirbutes of the card-component element in dailyspread.js file
   */
  connectedCallback() {
    let flipped = false;
    let focused = false;

    this.attachShadow({ mode: 'open' });
    const shadow = this.shadowRoot;

    // create wrapper and card container
    const container = document.createElement('div');
    container.classList.add('card-container');

    const wrapper = document.createElement('div');
    wrapper.classList.add('card-wrapper');

    const card = document.createElement('div');
    card.classList.add('card');

    // retrieve attributes
    const image = this.getAttribute('image');
    const title = this.getAttribute('name');
    const arcana = this.getAttribute('arcana');
    const suit = this.getAttribute('suit');
    const uprightMeanings = JSON.parse(
      this.getAttribute('uprightMeanings') || '[]'
    );
    const reversedMeanings = JSON.parse(
      this.getAttribute('reversedMeanings') || '[]'
    );
    const keywords = JSON.parse(this.getAttribute('keywords') || '[]');
    const description = this.getAttribute('description');
    const numeral = this.getAttribute('numeral');
    const facing = this.getAttribute('facing');
    const upsideDown = this.getAttribute('upsideDown');
    //  const interpretation = this.getAttribute('interpretation')

    /**
     * card.innerHtml defines the visual html structure of the card
     */
    card.innerHTML = `
         <div class="card-back">

         </div>
         <div class="card-front"> 
            <div class="summary">
               <img src="../../..${image}" alt="${title}"/>
               <h3>${numeral}) ${title} </h3>
               <strong>${arcana} - ${suit} </strong>
            </div>
            <div class="details hidden">
               <section>
                  <div class="section-header">
                     <h4>Description</h4>
                     <button data-toggle="desc">-</button>
                  </div>
                  <p data-content="desc">${description}</p>
               </section>
               <section>
                  <div class="section-header">
                     <h4>Keywords</h4>
                     <button data-toggle="keywords">-</button>
                  </div>
                  <div class="keywords" data-content="keywords">
                     ${keywords.join(', ')}
                  </div>
               </section>
               ${
                 upsideDown == 'false'
                   ? `<section>
                  <div class="section-header">
                     <h4>Upright Meanings</h4>
                     <button data-toggle="upright">-</button>
                  </div>
                  <ul data-content="upright">
                     ${uprightMeanings.map((item) => `<li>${item}</li>`).join('')}
                  </ul>
               </section>`
                   : `<section>
                  <div class="section-header">
                     <h4>Reversed Meanings</h4>
                     <button id="reversed">-</button>
                  </div>
                  <ul data-content="reversed">
                     ${reversedMeanings.map((item) => `<li>${item}</li>`).join('')}
                  </ul>
               </section>`
               }
            </div>
         </div>
      `;
    /**
     * Adds toggle behavior with data-attribute
     */
    const toggleButtons = card.querySelectorAll('button[data-toggle]');
    toggleButtons.forEach((button) => {
      const key = button.getAttribute('data-toggle');
      const content = card.querySelector(`[data-content="${key}"]`);
      let collapsed = false;

      button.addEventListener('click', (e) => {
        e.stopPropagation();
        collapsed = !collapsed;

        if (collapsed) {
          content.classList.add('collapsed');
          button.textContent = '+';
        } else {
          content.classList.remove('collapsed');
          button.textContent = '−';
        }
      });
    });

    // create styles
    const style = document.createElement('style');
    style.textContent = `
         .card-wrapper {
            width: 260px;
            height: 420px;
            perspective: 1200px;
            cursor: pointer;
            margin: 1rem;
            border-radius: 16px
         }

         .card-container {
            display: flex;
            flex-direction: column;
            align-items: center
         }

         .card {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s ease-in-out;
            border-radius: 16px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            background-color: #f9f5ec;
            border: dashed gray 1px
         }

         .card.flip {
            transform: rotateY(180deg)
         }

         .card-front, .card-back {
            width: 100%;
            height: 100%;
            position: absolute;
            backface-visibility: hidden;
            border-radius: 16px;
            overflow-y: auto;
            padding: 16px;
            box-sizing: border-box
         }

         .card-back {
            background: url('../images/cardback.jpg') center/cover no-repeat
         }

         .card-front {
            transform: rotateY(180deg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            height: 100%;
            overflow-y: auto
         }

         section {
            margin-bottom: 4px
         }

         .section-header {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px
         }

         .section-header h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: #333
         }

         .section-header button {
            padding: 1px 8px;
            font-size: 13px;
            background-color: #f0f4f8;
            border: 1px solid #ccc;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s ease
         }

         .section-header button:hover {
            background-color: #e2e8f0
         }

         [data-content].collapsed {
            max-height: 0;
            overflow: hidden;
            padding: 0;
            margin: 0;
            opacity: 0;
            transition: all 0.2s ease
         }

         [data-content] {
            transition: all 0.2s ease
         }

         img {
            height: 80%;
            margin-bottom: 12px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
         }

         h3 {
            margin: 8px 0 4px;
            font-size: 1.1rem;
            text-align: center;
            font-weight: 600
         }

         strong {
            font-size: 0.8rem;
            margin-bottom: 8px;
            text-align: center
         }

         .keywords {
            font-style: italic;
            font-size: 0.85rem;
            color: #555;
            margin-top: 8px;
            text-align: center
         }

         ul {
            padding-left: 1.2rem;
            margin: 8px 0
         }

         ul li {
            font-size: 12px;
            margin-bottom: 2px
         }

         p {
            font-size: 0.8rem;
            line-height: 1.4;
            margin-top: 10px
         }

         .details.hidden {
            display: none
         }

         .card.focused {
            z-index: 10;
            transform: scale(1.2) rotateY(180deg);
            transition: transform 0.6s ease, z-index 0s
         }

         .reversed-note {
            text-align: center;
            font-size: 0.9rem;
            color: #000;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px
         }

         .info-btn {
         background: none;
         border: none;
         cursor: pointer;
         font-size: 1rem;
         padding: 0;
         color: #555
         }

         .info-btn:hover {
            color: #000
         }

         .summary {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%
         }

         .card.upsidedown .card-front .summary img {
            transform: rotateX(180deg)
         }

         .card.focused .summary {
            display: none
         }
         
         .card.focused .card-front {
            justify-content: flex-start;
            align-items: center
         }

      `;

    //append to shadow layer
    wrapper.appendChild(card);
    container.appendChild(wrapper);

    // if reversed, add label below the card
    if (upsideDown === 'true' || facing === 'true') {
      //       const reversedNote = document.createElement("div");
      //       reversedNote.classList.add("reversed-note");
      //       reversedNote.innerHTML = `
      //     <span>Reversed</span>
      //     <button class="info-btn" title="Reversed cards have different meanings from normal cards">ℹ️</button>
      //   `;
      //       container.appendChild(reversedNote);
      card.classList.add('upsidedown');
    }

    shadow.append(style, container);

    // add event listener for card flipping on click

    wrapper.addEventListener('click', () => {
      if (!flipped) {
        card.classList.add('flip');
        flipped = true;
      } else if (!focused) {
        card.classList.add('focused');
        card.querySelector('.details').classList.remove('hidden');
        focused = true;
      } else {
        card.classList.remove('focused');
        card.querySelector('.details').classList.add('hidden');
        focused = false;
      }
    });
  }
}

customElements.define('card-component', CardComponent);
