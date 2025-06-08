import Card from '../../backend/Card.js';
import Horoscope from '../../backend/horoscope.js';

const backgroundImageURL = '../images/paul-volkmer-stars.jpg';

// grab from localStorage
function getStoredCards(amount) {
  const currentDate = new Date().toISOString().split('T')[0];

  const allData = JSON.parse(localStorage.getItem('dailyCards'));

  console.log(currentDate);

  const dailySpread = allData[currentDate][amount];

  console.log('saved: ' + dailySpread);

  let cardArray = [];

  dailySpread.forEach((card) => {
    let parsed = typeof card === 'string' ? JSON.parse(card) : card;
    cardArray.push(new Card(parsed.id, parsed.faceup, parsed.upsideDown));
  });

  console.log('Saved cards from localStorage:', cardArray);

  let result = cardArray.map((card) => ({
    image: card.getImg(),
    name: card.getCardName(),
    keywords: card.getKeywords().join(', '),
    upsideDown: card.isUpsideDown(),
    meaning: card.isUpsideDown()
      ? card.getReversedMeaning().join('. ')
      : card.getUprightMeanings().join('. '),
  }));

  result.push(currentDate);

  console.log('result: ' + result);
  return result;
}

async function generateImageCards(data) {
  const cardWidth = 350;
  const cardHeight = 600;
  const padding = 50;
  const maxCols = 5;

  // Calculate number of rows and columns based on data length
  const totalCards = data.length - 1;
  const rows = Math.ceil(totalCards / maxCols);
  const cols = totalCards > maxCols ? maxCols : totalCards;

  const textBoxOffset = 625; // distance from imageY to nameY
  const textBoxHeight = 235 + 90; // height from nameY-20 to meaningY+235
  const cardAndBoxHeight =
    cardHeight + textBoxOffset + textBoxHeight - 625 + 36; // full height from imageY to end of box

  // Calculate canvas size
  const canvasWidth = cols * cardWidth + (cols + 1) * padding;
  const canvasHeight = rows * cardAndBoxHeight + (rows + 1) * padding + 80; // 80 for date at the top

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  const date = data[data.length - 1];
  data.pop();

  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';

  await document.fonts.ready;

  // background image
  const bgImg = await loadImage(backgroundImageURL);
  const itemImages = await Promise.all(
    data.map((item) => loadImage('../../cards/' + item.image))
  );
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  const usernameY = 50;
  const dateY = 100;

  const userInfo = JSON.parse(localStorage.getItem('tarotUserInfo'));
  const username = userInfo.name || 'User';
  ctx.font = "52px 'Noto Serif'";
  ctx.fillText(`${username}'s Daily Tarot`, canvas.width / 2, usernameY);

  ctx.font = "48px 'Noto Serif'";
  ctx.fillText(`${date}`, canvas.width / 2, dateY);
  // Draw cards in two rows of 5, with text boxes below each card
  data.forEach((item, index) => {
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    let x = padding + col * (cardWidth + padding);
    if (cols == 3) {
      // Center the cards if there are only 3 columns (i.e. 3 cards in one row)
      x = index * 350 + padding * (index + 1);
    }

    // Calculate y for this row
    // 80 for date, then padding, then row * (card+box+padding)
    const baseY = 80 + padding + row * (cardAndBoxHeight + padding);

    const imageY = baseY;
    const nameY = imageY + 625;
    const keywordsY = nameY + 40;
    const meaningY = keywordsY + 90;
    const boxX = x;
    const boxY = nameY - 20;
    const boxWidth = cardWidth;
    const boxHeight = meaningY + 235 - boxY;

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

    // Draw text box below card
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.font = "28px 'Noto Serif'";
    ctx.fillText(item.name, x + cardWidth / 2, nameY);

    ctx.beginPath();
    ctx.moveTo(x, nameY + 18);
    ctx.lineTo(x + cardWidth, nameY + 18);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    ctx.font = "24px 'Noto Serif'";
    wrapText(
      ctx,
      item.keywords,
      x + cardWidth / 2,
      keywordsY,
      cardWidth,
      24,
      'keywords: ',
      ''
    );
    ctx.font = "20px 'Noto Serif'";
    wrapText(
      ctx,
      item.meaning,
      x + cardWidth / 2,
      meaningY,
      cardWidth,
      24,
      'Meanings: ',
      '.'
    );
  });

  const link = document.createElement('a');
  link.download = 'daily_reading.jpg';
  link.href = canvas.toDataURL('image/jpeg');
  link.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, lineStart, lineEnd) {
  const words = text.split(' ');
  let line = lineStart;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
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
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function generateImageHoroscope() {
  const userText = await localStorage.getItem('tarotUserInfo');
  const userInfo = await JSON.parse(userText);

  const sign = Horoscope.getHoroscope(Horoscope.getDate(userInfo.dob));

  const items = Horoscope.generateReadingFromCurrentUser();
  const currentDate = new Date();

  const labels = ['Theme', 'Mood', 'Advice'];

  const canvasWidth = 1000;
  const canvasHeight = 1200;
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';

  const imgSize = 400;

  const bgImg = await loadImage(backgroundImageURL);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  ctx.font = "60px 'Noto Serif'";

  const nameString = userInfo.name + "'s Horoscope";
  const nameY = 120;

  ctx.fillText(nameString, canvasWidth / 2, nameY);

  const horoscopeY = nameY + 50;

  const imgX = canvasWidth / 2 - imgSize / 2;
  const centerX = imgX + imgSize / 2;
  const centerY = horoscopeY + imgSize / 2;
  const radius = 200; // 500px diameter

  const horoscopeImg = await loadImage(`../images/zodiacs/${sign}.png`);

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((135 * Math.PI) / 180);

  const gradient = ctx.createLinearGradient(-radius, 0, radius, 0);
  gradient.addColorStop(0, 'white');
  gradient.addColorStop(0.025, '#FED500');
  gradient.addColorStop(0.6, '#904B01');
  gradient.addColorStop(0.975, '#FED500');
  gradient.addColorStop(1, 'white');

  ctx.beginPath();
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 5;

  // Circle center = center of image

  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.restore();

  ctx.drawImage(
    horoscopeImg,
    canvasWidth / 2 - 200,
    horoscopeY,
    imgSize,
    imgSize
  );

  const signY = horoscopeY + 480;

  ctx.font = "52px 'Noto Serif'";
  ctx.fillText(sign, canvasWidth / 2, signY);

  const dateY = signY + 50;

  ctx.font = "32px 'Noto Serif'";
  ctx.fillText(`${currentDate.toLocaleDateString()}`, canvasWidth / 2, dateY);

  // Draw the three items
  let y = dateY + 100;
  items.forEach((item, i) => {
    ctx.font = "bold 40px 'Noto Serif'";
    ctx.fillText(labels[i], canvas.width / 2, y);
    ctx.font = "32px 'Noto Serif'";
    wrapText(ctx, item, canvas.width / 2, y + 40, 640, 28, '', '');
    y += 110; // space between items
  });

  const link = document.createElement('a');
  link.download = 'horoscope.jpg';
  link.href = canvas.toDataURL('image/jpeg');
  link.click();
}

// document.addEventListener("DOMContentLoaded", () => {
//   document
//     .getElementById("generateBtn")
//     .addEventListener("click", () => generateImageCards(getStoredCards(3)));
//   document.getElementById("getCardsBtn").addEventListener("click", () => {
//     const data = getStoredCards(3);
//   });
//   document
//     .getElementById("generateHoroscopeBtn")
//     .addEventListener("click", generateImageHoroscope);
// });

export default getStoredCards;
export { generateImageHoroscope };
export { generateImageCards, getStoredCards, loadImage, wrapText };
