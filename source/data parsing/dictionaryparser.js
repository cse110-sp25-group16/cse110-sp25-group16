function saveObjectAsJSON(obj, filename = 'data.json') {
  const jsonStr = JSON.stringify(obj, null, 2); // pretty print
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// async function loadDescriptions() {
//   const response = await fetch('./output.json');
//   const json = await response.json();

//   var descDict = {};

//   for (let i = 0; i < json.length; i++) {
//     descDict[json[i].label] = json[i].description;
//   }

//   return descDict;
// }

async function loadCards() {
  const response = await fetch('./tarot-images.json');
  const json = await response.json();

  const desc = await fetch('./descriptions.json');
  const descjson = await desc.json();

  console.log(json.cards.length);

  var cardDict = {};

  for (let i = 10; i < 11; i++) {
    cardDict[i] = {
      name: json.cards[i].name,
      arcana: json.cards[i].arcana,
      uprightMeanings: json.cards[i].meanings.light,
      reversedMeanings: json.cards[i].meanings.shadow,
      suit: json.cards[i].suit,
      keywords: json.cards[i].keywords,
      img: json.cards[i].img,
      symbolism: 'TODO',
      // "description": descjson[json.cards[i].name],
      numeral: json.cards[i].number,
    };

    if (cardDict[i].description == undefined)
      console.error(
        'error desc',
        i,
        json.cards[i].name,
        descjson[json.cards[i].name]
      );

    if (cardDict[i].name == undefined) console.error('error name');

    if (cardDict[i].arcana == undefined) console.error('error arcana');

    if (cardDict[i].uprightMeanings == undefined)
      console.error('error uprightMeanings');

    if (cardDict[i].reversedMeanings == undefined)
      console.error('error reversedMeanings', i);

    if (cardDict[i].suit == undefined) console.error('error suit');

    if (cardDict[i].keywords == undefined) console.error('error name');

    if (cardDict[i].img == undefined) console.error('error img');

    if (cardDict[i].numeral == undefined) console.error('error numeral');
  }

  return cardDict;
}

// loadDescriptions().then(descriptions => {
//     saveObjectAsJSON(descriptions);
// })

loadCards().then((cards) => {
  saveObjectAsJSON(cards);
});
