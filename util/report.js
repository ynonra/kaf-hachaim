import {Linking} from 'react-native';
import {convertNumericIndexToHebrew} from '../text-parse-utils/index-convertion';

export const sendReportMail = ({
  originalText,
  isKafHaChaim,
  correctText,
  simanIndex,
  seifIndex,
  helekFrom4Turim,
}) => {
  const subject = `טעות ביישומון כף החיים ב-${
    isKafHaChaim ? 'כף החיים' : 'שולחן ערוך'
  }`;

  let mistakeStartIndex = 0;

  for (let i = 0; i < correctText.length; i++) {
    if (correctText[i] !== originalText[i]) {
      mistakeStartIndex = i;
      break;
    }
  }

  const hebSiman = convertNumericIndexToHebrew(simanIndex);
  const hebSeif = convertNumericIndexToHebrew(seifIndex);

  const body = `
  חלק ${helekFrom4Turim} סימן ${hebSiman} סעיף ${hebSeif}


  הנוסח כעת:
  ${addSignsAtIndexes(originalText, mistakeStartIndex)}

  הצעה לתיקון:
  ${addSignsAtIndexes(correctText, mistakeStartIndex)}
  `;
  Linking.openURL(`mailto:ynonra@gmail.com?subject=${subject}&body=${body}`);

  function addSignsAtIndexes(text, startIndex) {
    let parsedText = text.split('');
    parsedText.splice(startIndex, 0, '👈');
    return parsedText.join('');
  }
};
