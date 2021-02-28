import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem(key) {
  const JSONData = await AsyncStorage.getItem(key);
  if (!JSONData) return null;
  return await JSON.parse(JSONData);
}

export async function setItem(key, data) {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
}
