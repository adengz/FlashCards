import AsyncStorage from '@react-native-community/async-storage';

const SETTINGS_STORAGE_KEY = '@FlashCards:settings';

export const initiateSettingsAsync = (defaultSettings) => {
  return AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
};

export const fetchSettingsAsync = () => {
  return AsyncStorage.getItem(SETTINGS_STORAGE_KEY).then((str) => JSON.parse(str));
};

const updateSettingsAsync = (settings) => {
  return AsyncStorage.mergeItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

export const toggleDarkAsync = () => {
  return fetchSettingsAsync().then((settings) =>
    updateSettingsAsync({ ...settings, dark: !settings.dark })
  );
};

export const reverseDeckOrderAsync = () => {
  return fetchSettingsAsync().then((settings) => {
    const newSettings = {
      ...settings,
      sortDecks: {
        ...settings.sortDecks,
        descending: !settings.sortDecks.descending,
      },
    };
    return updateSettingsAsync(newSettings);
  });
};

export const updateDeckSortingAsync = (by) => {
  return fetchSettingsAsync().then((settings) => {
    const newSettings = {
      ...settings,
      sortDecks: {
        ...settings.sortDecks,
        by,
      },
    };
    return updateSettingsAsync(newSettings);
  });
};
