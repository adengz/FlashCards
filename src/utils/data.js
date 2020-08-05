import AsyncStorage from '@react-native-community/async-storage';

const DATA_STORAGE_KEY = '@FlashCards:data';

const updateDataAsync = async (data) => {
  return AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
};

export const fetchDataAsync = async () => {
  const str = await AsyncStorage.getItem(DATA_STORAGE_KEY);
  return JSON.parse(str);
};

export const clearDataAsync = async () => {
  return updateDataAsync({ decks: {}, cards: {} });
};

export const addDeckAsync = async ({ id, title, timestamp }) => {
  const data = await fetchDataAsync();
  data.decks[id] = { id, title, timestamp, cards: [] };
  return updateDataAsync(data);
};

export const updateDeckTitleAsync = async ({ id, title }) => {
  const data = await fetchDataAsync();
  data.decks[id].title = title;
  return updateDataAsync(data);
};

export const deleteDeckAsync = async (id) => {
  const data = await fetchDataAsync();
  const { cards } = data.decks[id];
  cards.forEach((cardId) => {
    data.cards[cardId] = undefined;
  });
  data.decks[id] = undefined;
  return updateDataAsync(data);
};

export const addCardAsync = async ({ id, newCardId, question, answer }) => {
  const data = await fetchDataAsync();
  data.decks[id].cards.push(newCardId);
  data.cards[newCardId] = { id: newCardId, question, answer };
  return updateDataAsync(data);
};

export const updateCardAsync = async ({ cardId, question, answer }) => {
  const data = await fetchDataAsync();
  data.cards[cardId] = { id: cardId, question, answer };
  return updateDataAsync(data);
};

export const deleteCardsAsync = async ({ id, cardIds }) => {
  const data = await fetchDataAsync();
  const deletedCardIds = new Set(cardIds);
  cardIds.forEach((cardId) => {
    data.cards[cardId] = undefined;
  });
  data.decks[id].cards = data.decks[id].cards.filter((k) => !deletedCardIds.has(k));
  return updateDataAsync(data);
};
