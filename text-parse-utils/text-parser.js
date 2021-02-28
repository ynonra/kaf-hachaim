const fs = require('fs').promises;
const {
  convertNumericIndexToHebrew,
  convertHebrewIndexToNumeric,
} = require('./index-convertion');

async function readTextFromFile(path) {
  return JSON.parse(await fs.readFile(path)).text;
}

async function writeTextToFile(data) {
  return await fs.writeFile(
    './updated-book.json',
    JSON.stringify(data, null, 2)
  );
}

async function a() {}

let errorIndexStr = '';

async function divideToSeifim() {
  const kafHaChaimArray = await readTextFromFile(
    "./Kaf HaChayim on Shulchan Arukh, Yoreh De'ah - he - Kaf Hachayim, Yoreh Deah, Jerusalem 1936-1957.json"
  );
  const shulhanAruhArray = (
    await readTextFromFile(
      // './Shulchan Arukh, Orach Chayim - he - Maginei Eretz- Shulchan Aruch Orach Chaim, Lemberg, 1893.json'
      `./Shulchan Arukh, Yoreh De'ah - he - Ashlei Ravrevei- Shulchan Aruch Yoreh Deah, Lemberg, 1888.json`
    )
  )
    .slice(0, 119)
    .map((simanArr) =>
      simanArr.map((seifString) => {
        return {
          shulchanArukh: removeHtmlElements(seifString),
          kafHaChaim: [],
        };
      })
    );

  for (let i = 0; i < shulhanAruhArray.length; i++) {
    const bigSiman = kafHaChaimArray[i];
    let hebBigSeif;
    if (!bigSiman) console.log(shulhanAruhArray.length);

    for (let j = 0; j < bigSiman.length; j++) {
      const seifKatanParagraphs = bigSiman[j];
      if (!seifKatanParagraphs.length) continue;

      let hebBigSeifMatch = calcHebSeif(seifKatanParagraphs);
      if (hebBigSeifMatch) hebBigSeif = hebBigSeifMatch;
      try {
        const numericIndex = convertHebrewIndexToNumeric(hebBigSeif);

        shulhanAruhArray[i][numericIndex].kafHaChaim.push(seifKatanParagraphs);
      } catch (err) {
        const currentErrorStr = i;
        if (currentErrorStr !== errorIndexStr) {
          errorIndexStr = currentErrorStr;
        }
      }
    }
    // fs.writeFile(`../data/simanim/${i}.json`, JSON.stringify(shulhanAruhArray[i], null, 2));
  }
  fs.writeFile(
    `../data/יורה דעה.json`,
    JSON.stringify(shulhanAruhArray, null, 2)
  );
}

function calcHebSeif(seifKatanTextArr) {
  let hebBigSeif;
  const bigSeifMatch = seifKatanTextArr.join('').match(/\[סעיף.{0,8}\]/);
  if (!bigSeifMatch) return;

  hebBigSeif = bigSeifMatch[0].replace(
    /\[סעיף (?<hebSeif>.+?)'\]/,
    '$<hebSeif>'
  );
  if (hebBigSeif === 'יוד') hebBigSeif = 'י';
  return hebBigSeif;
}

function removeHtmlElements(str) {
  try {
    return str.replace(/<i data-commentator.+?\/i>/g, '');
  } catch (err) {
    console.log(err);
  }
}

divideToSeifim();
