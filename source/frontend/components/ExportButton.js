import Card from "../../backend/Card.js";

const backgroundImageURL = "../images/paul-volkmer-stars.jpg";

// grab from localStorage
function getStoredCards(amount) {
  const allData = JSON.parse(localStorage.getItem(`dailyCards_${amount}`));

  const saved = allData.cards;
  const date = allData.date;

  console.log("saved: " + saved);

  let cardArray = [];

  saved.forEach((card) => {
    let parsed = typeof card === "string" ? JSON.parse(card) : card;
    cardArray.push(new Card(parsed.id, parsed.faceup, parsed.upsideDown));
  });

  console.log("Saved cards from localStorage:", cardArray);

  let result = cardArray.map((card) => ({
    image: card.getImg(),
    name: card.getCardName(),
    keywords: card.getKeywords().join(", "),
    upsideDown: card.isUpsideDown(),
    meaning: card.isUpsideDown()
      ? card.getReversedMeaning().join(". ")
      : card.getUprightMeanings().join(". "),
  }));

  result.push(date);

  console.log("result: " + result);
  return result;
}

async function generateImageCards(data) {
  // SPECIFICALLY FOR 3-SPREAD
  // MAKE CARDS IMAGE UPSIDE DOWN IF UPSIDE DOWN
  const canvas = document.createElement("canvas");
  canvas.width = 1250;
  canvas.height = 1100;
  const ctx = canvas.getContext("2d");

  const rowWidth = 350;
  const cardWidth = 350;
  const cardHeight = 600;
  const padding = 50;

  const date = data[data.length - 1]; // FIX
  data.pop();
  console.log("the date: " + date);

  const dateY = 50;
  const imageY = dateY + 40;
  const nameY = imageY + 625;
  const keywordsY = nameY + 40;
  const meaningY = keywordsY + 90;
  const meaningMaxWidth = cardWidth;
  const keywordsMaxWidth = cardWidth;
  const lineHeight = 24;

  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";

  await document.fonts.ready;

  // Load images
  const bgImg = await loadImage(backgroundImageURL);
  const itemImages = await Promise.all(
    data.map((item) => loadImage("../../cards/" + item.image))
  );

  // Draw background
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  ctx.font = "48px 'Noto Serif'";
  ctx.fillText(`${date}`, canvas.width / 2, dateY);

  // Draw data rows
  data.forEach((item, index) => {
    const x = index * rowWidth + padding * (index + 1);
    ctx.font = "32px 'Noto Serif'";

    if (item.upsideDown) {
      ctx.save();
      ctx.translate(x + cardWidth / 2, imageY + cardHeight / 2);
      ctx.scale(1, -1);
      ctx.drawImage(
        itemImages[index],
        -cardWidth / 2,
        -cardHeight / 2,
        cardWidth,
        cardHeight
      );
      ctx.restore();
    } else {
      ctx.drawImage(itemImages[index], x, imageY, cardWidth, cardHeight);
    }

    const boxX = x;
    const boxY = nameY - 20; // a bit above the name text
    const boxWidth = cardWidth;
    const boxHeight = meaningY + 235 - boxY; // 90 is ~ how tall 3 wrapped text lines might be

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.fillText(item.name, x + cardWidth / 2, nameY);

    ctx.beginPath();
    ctx.moveTo(x, nameY + 18); // 10 pixels below the name text
    ctx.lineTo(x + cardWidth, nameY + 18); // full width of the box
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    ctx.font = "24px 'Noto Serif'";
    wrapText(
      ctx,
      item.keywords,
      x + cardWidth / 2,
      keywordsY,
      keywordsMaxWidth,
      lineHeight,
      "keywords: ",
      ""
    );
    wrapText(
      ctx,
      item.meaning,
      x + cardWidth / 2,
      meaningY,
      meaningMaxWidth,
      lineHeight,
      "meanings: ",
      "."
    );
  });

  // Export as PNG and trigger download
  const link = document.createElement("a");
  link.download = "daily_reading.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, lineStart, lineEnd) {
  const words = text.split(" ");
  let line = lineStart;

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
  line = line.substring(0, line.length - 1);
  line += lineEnd;
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

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("generateBtn")
    .addEventListener("click", () => generateImageCards(getStoredCards(3)));
  document.getElementById("getCardsBtn").addEventListener("click", () => {
    const data = getStoredCards(3);
  });
});

export default getStoredCards;
