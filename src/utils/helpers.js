const generateUID = (len) => Math.random().toString().substr(2, len);

export const getNewDeckMetaData = () => ({
  deckId: `deck_${generateUID(9)}`,
  timestamp: Date.now(),
});
