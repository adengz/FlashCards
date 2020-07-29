const generateUID = (len) => Math.random().toString().substr(2, len);

export const getNewDeckMetaData = () => ({
  id: `deck_${generateUID(9)}`,
  timestamp: Date.now(),
});

export const getNewCardMetaData = () => ({
  newCardId: `card_${generateUID(11)}`,
});

export const getFormattedStats = (count) => `${count} card${count === 1 ? '' : 's'}`;
