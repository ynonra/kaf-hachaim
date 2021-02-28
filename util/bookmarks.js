import { getItem, setItem } from './async-storage';

export async function getBookmarks() {
  return await getItem('bookmarks');
}

async function setBookmarks(data) {
  return await setItem('bookmarks', data);
}

export async function saveOneBookmark({
  simanIndex,
  seifIndex,
  helekFrom4Turim,
  bookmarkName,
}) {
  let data = await getBookmarks();
  if (!Array.isArray(data)) data = [];
  const newItem = { simanIndex, seifIndex, helekFrom4Turim, bookmarkName };
  data.push(newItem);

  return await setBookmarks(data);
}

export async function deleteBookmark(bookmarkIndex) {
  let data = await getBookmarks();
  data.splice(bookmarkIndex, 1);
  await setBookmarks(data);
  return data;
}

export async function renameBookmark(bookmarkIndex, bookmarkName) {
  let data = await getBookmarks();
  data[bookmarkIndex].bookmarkName = bookmarkName;
  await setBookmarks(data);
  return data;
}

export async function removeAllBookmarks() {
  return await setBookmarks([]);
}
