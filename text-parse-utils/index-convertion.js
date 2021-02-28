function convertNumericIndexToHebrew(index) {
  let rest = index + 1;
  let hebIndex = '';

  while (rest > 0) {
    lettersToValueArray.forEach((letterData) => {
      const [hebLetter, letterValue] = Object.entries(letterData)[0];
      if (letterValue > rest) return;
      if (rest === 15) {
        hebIndex += 'טו';
        rest -= 15;
      } else if (rest === 16) {
        hebIndex += 'טז';
        rest -= 16;
      } else {
        hebIndex += hebLetter;
        rest -= letterValue;
      }
    });
  }

  return hebIndex;
}

function convertHebrewIndexToNumeric(hebIndex) {
  return (
    hebIndex
      .split('')
      .reduce(
        (prevValue, currentValue) =>
          prevValue + lettersToValueObj[currentValue],
        0
      ) - 1
  );
}

const lettersToValueArray = [
  { ת: 400 },
  { ש: 300 },
  { ר: 200 },
  { ק: 100 },
  { צ: 90 },
  { פ: 80 },
  { ע: 70 },
  { ס: 60 },
  { נ: 50 },
  { מ: 40 },
  { ל: 30 },
  { כ: 20 },
  { י: 10 },
  { ט: 9 },
  { ח: 8 },
  { ז: 7 },
  { ו: 6 },
  { ה: 5 },
  { ד: 4 },
  { ג: 3 },
  { ב: 2 },
  { א: 1 },
];

const lettersToValueObj = {
  ת: 400,
  ש: 300,
  ר: 200,
  ק: 100,
  צ: 90,
  פ: 80,
  ע: 70,
  ס: 60,
  נ: 50,
  מ: 40,
  ל: 30,
  ך: 20,
  כ: 20,
  י: 10,
  ט: 9,
  ח: 8,
  ז: 7,
  ו: 6,
  ה: 5,
  ד: 4,
  ג: 3,
  ב: 2,
  א: 1,
};

module.exports.convertNumericIndexToHebrew = convertNumericIndexToHebrew;
module.exports.convertHebrewIndexToNumeric = convertHebrewIndexToNumeric;
