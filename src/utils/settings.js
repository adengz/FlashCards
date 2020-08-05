import AsyncStorage from '@react-native-community/async-storage';

const SETTINGS_STORAGE_KEY = '@FlashCards:settings';

export const initiateSettingsAsync = async (defaultSettings) => {
  return AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
};

export const fetchSettingsAsync = async () => {
  const str = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
  return JSON.parse(str);
};

const updateSettingsAsync = async (settings) => {
  return AsyncStorage.mergeItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

export const toggleDarkAsync = async () => {
  const settings = await fetchSettingsAsync();
  settings.dark = !settings.dark;
  return updateSettingsAsync(settings);
};

export const reverseDeckOrderAsync = async () => {
  const settings = await fetchSettingsAsync();
  settings.sortDecks.descending = !settings.sortDecks.descending;
  return updateSettingsAsync(settings);
};

export const updateDeckSortingAsync = async (by) => {
  const settings = await fetchSettingsAsync();
  settings.sortDecks.by = by;
  return updateSettingsAsync(settings);
};
