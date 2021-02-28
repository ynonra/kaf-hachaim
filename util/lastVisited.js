import { getItem, setItem } from './async-storage';

export async function getLastVisitedData() {
  return await getItem('last-visited');
}

async function setLastVisitedData(data) {
  return await setItem('last-visited', data);
}

export async function saveOneDoc({ simanIndex, seifIndex, helekFrom4Turim }) {
  let oldData = await getLastVisitedData();
  if (!Array.isArray(oldData)) oldData = [];
  const alreadyVisitedIndex = oldData.findIndex(
    (visitedItem) =>
      visitedItem.simanIndex === simanIndex &&
      visitedItem.seifIndex === seifIndex &&
      visitedItem.helekFrom4Turim === helekFrom4Turim
  );
  if (alreadyVisitedIndex >= 0) {
    const alreadyVisitedItem = oldData[alreadyVisitedIndex];
    alreadyVisitedItem.date = Date.now();
    oldData.splice(alreadyVisitedIndex, 1);
    oldData.push(alreadyVisitedItem);
    return await setLastVisitedData(oldData);
  }
  const newItem = { simanIndex, seifIndex, helekFrom4Turim, date: Date.now() };
  oldData.push(newItem);
  if (oldData.length > 10) oldData.shift();
  return await setLastVisitedData(oldData);
}

export function calcTimesAgoString(date) {
  const min = 6e4;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 29.5;
  const timesData = [
    { key: 'month', ms: month, hebOne: 'חודש', hebMany: 'חודשים' },
    { key: 'week', ms: week, hebOne: 'שבוע', hebMany: 'שבועות' },
    { key: 'day', ms: day, hebOne: 'יום', hebMany: 'ימים' },
    { key: 'hour', ms: hour, hebOne: 'שעה', hebMany: 'שעות' },
    { key: 'min', ms: min, hebOne: 'דקה', hebMany: 'דקות' },
  ];
  const timesAgoData = { month: 0, week: 0, day: 0, hour: 0, min: 0 };

  let timeRest = Date.now() - date;

  for (let time of timesData) {
    if (time.ms > timeRest || timeRest < min) continue;
    const howManyTimes = Math.floor(timeRest / time.ms);
    timesAgoData[time.key] += howManyTimes;
    timeRest -= time.ms * howManyTimes;
  }

  let timesAgoString = 'לפני';
  for (let i = 0; i < timesData.length; i++) {
    const timeData = timesData[i];
    const howManyTimes = timesAgoData[timeData.key];
    if (howManyTimes === 0) continue;

    // const isLastStr = checkIfLastTimeStr(timesData.slice(i + 1));
    timesAgoString += ' ';
    if (howManyTimes === 1) {
      // if (isLastStr) timesAgoString += 'ו';
      timesAgoString += timeData.hebOne;
    } else {
      // if (isLastStr) timesAgoString += 'ו-';
      timesAgoString += `${howManyTimes} ${timeData.hebMany}`;
    }
    break; // כי אני רוצה רק סוג זמן אחד
  }

  // function checkIfLastTimeStr(restTimesData) {
  //   restTimesData.forEach((timeData) => {
  //     if (timesAgoData[timeData.key] > 0) return false;
  //   });
  //   return timesAgoString !== 'לפני';
  // }

  if (timesAgoString === 'לפני') timesAgoString = 'ממש עכשיו';

  return timesAgoString;
}
