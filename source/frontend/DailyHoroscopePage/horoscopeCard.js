class HoroscopeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.classList.add('card-container');

    const style = document.createElement('style');
    style.textContent = `
      .card-container {
        width: 25vh;
        height: 40vh;
        perspective: 1000px;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
        margin: 50px auto;
      }
      .card {
        width: 100%;
        height: 100%;
        
        transform-style: preserve-3d;
        transition: transform 0.8s;
        transform-origin: center;
      }
      .card.is-flipped {
        transform: rotateY(180deg);
      }
      .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("../images/cardback.jpg");
        border: 1px solid #ccc;
        border-radius: 12px;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
      }
      .card-face img {
        max-width: 100px;
        height: auto;
        margin-top: 10px;
        background-color: f9f5ec;
      }
      .card-face h2 {
        margin: 0;
        font-size: 1.4em;
        text-align: center;
      }
      .card-face p {
        font-size: 1em;
        text-align: center;
        margin-bottom: 10px;

      }

      .card-front {
      color: #ffffff;
        text-shadow:
          -1px -1px 0 #000,  
          1px -1px 0 #000,
          -1px  1px 0 #000,
          1px  1px 0 #000;
      }
      .card-back {
        transform: rotateY(180deg);
        background-color: #f9f5ec;
        background-image: none;
      }
      .card-back h2 {
        color: #000000;
      }
      .card-back a {
        color: black;
      }
    `;

    const frontImg = this.getAttribute('front-img');
    const frontTitle = this.getAttribute('front-title');
    const frontDesc = this.getAttribute('front-desc');

    const backImg = this.getAttribute('back-img');
    const backTitle = this.getAttribute('back-title');
    const backDesc = this.getAttribute('back-desc');

    wrapper.innerHTML = `
      <div class="card">
        <div class="card-face card-front">
          <img src="${frontImg}" alt="Front image">
          <h2>${frontTitle}</h2>
          <p>${frontDesc}</p>
        </div>
        <div class="card-face card-back">
          <img src="${backImg}" alt="Back image">
          <h2>${backTitle}</h2>
          <p>${backDesc}</p>
        </div>
      </div>
    `;

    this.shadowRoot.append(style, wrapper);
    this.wrapper = wrapper;
    this.card = wrapper.querySelector('.card');

    this.frontImg = this.card.querySelector('.card-front img');
    this.frontTitle = this.card.querySelector('.card-front h2');
    this.frontDesc = this.card.querySelector('.card-front p');

    this.backImg = this.card.querySelector('.card-back img');
    this.backTitle = this.card.querySelector('.card-back h2');
    this.backDesc = this.card.querySelector('.card-back p');

    this.card.addEventListener('click', () => {
      this.card.classList.toggle('is-flipped');
    });

    this.updateContent();
  }

  static get observedAttributes() {
    return [
      'front-img',
      'front-title',
      'front-desc',
      'back-img',
      'back-title',
      'back-desc',
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateContent();
    }
  }

  updateContent() {
    this.frontImg.src = this.getAttribute('front-img') || '';
    this.frontTitle.textContent = this.getAttribute('front-title') || '';
    this.frontDesc.textContent = this.getAttribute('front-desc') || '';

    this.backImg.src = this.getAttribute('back-img') || '';
    this.backTitle.textContent = this.getAttribute('back-title') || '';
    this.backDesc.textContent = this.getAttribute('back-desc') || '';
  }
}

customElements.define('horoscope-card', HoroscopeCard);
