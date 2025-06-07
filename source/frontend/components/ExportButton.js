const data = [
  {
    image: "../../cards/c01.jpg",
    keywords: "dog, animal",
    meaning: "A domesticated carnivorous mammal.",
  },
  {
    image: "../../cards/c02.jpg",
    keywords: "sun, star",
    meaning: "The star at the center of the solar system.",
  },
  {
    image: "../../cards/c03.jpg",
    keywords: "tree, plant",
    meaning: "A perennial plant with an elongated stem or trunk.",
  },
];

const backgroundImageURL = "../images/paul-volkmer-stars.jpg";

// grab from localStorage
function getStoredCards(amount) {
  const allData = JSON.parse(localStorage.getItem(`dailyCards_${amount}`));

  const saved = allData.cards;

  let cardArray = [];

  saved.forEach((card) => {
    cardArray.push(new Card(card.id, card.faceup, card.upsideDown));
  });

  console.log("Saved cards from localStorage:", cardArray);
  let result = cardArray.map((card) => ({
    image: card.getImg(),
    name: cards.getCardName(),
    keywords: card.getKeywords(),
    description: card.getDescription(),
  }));

  console.log(result);
  return result;
}

function generateData(localStorageInfo) {}

async function generateImageCards() {
  // SPECIFICALLY FOR 3-SPREAD
  const canvas = document.createElement("canvas");
  canvas.width = 1250; // FIX WIDTH TO # OF CARDS
  canvas.height = 900; // FIX HEIGHT TO # OF CARDS
  const ctx = canvas.getContext("2d");

  const rowWidth = 350;
  const cardWidth = 350;
  const cardHeight = 600;
  const padding = 50;

  const imageY = 20;
  const nameY = 640;
  const keywordsY = 660;
  const meaningY = 700;
  const meaningMaxWidth = cardWidth;
  const keywordsMaxWidth = cardWidth;
  const lineHeight = 22;

  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";

  await document.fonts.ready;

  // Load images
  const bgImg = await loadImage(backgroundImageURL);
  const itemImages = await Promise.all(
    data.map((item) => loadImage(item.image))
  );

  // Draw background
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Draw data rows
  data.forEach((item, index) => {
    const x = index * rowWidth + padding * (index + 1);
    ctx.font = "32px 'Noto Serif'";
    ctx.drawImage(itemImages[index], x, imageY, cardWidth, cardHeight);
    ctx.fillText(item.name, x, nameY);
    ctx.font = "24px 'Noto Serif'";
    wrapText(ctx, item.keywords, x, keywordsY, keywordsMaxWidth, lineHeight);
    wrapText(ctx, item.meaning, x, meaningY, meaningMaxWidth, lineHeight);
  });

  // Export as PNG and trigger download
  const link = document.createElement("a");
  link.download = "canvas_output.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/*document.getElementById("exportButton").addEventListener("click", () => {
  generateImage().catch((error) => {
    console.error("Error generating image:", error);
  });
}); */

export default getStoredCards;
