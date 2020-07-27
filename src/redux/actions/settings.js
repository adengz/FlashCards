export const TOGGLE_DARK = 'TOGGLE_DARK';
export const REVERSE_DECK_ORDER = 'REVERSE_DECK_ORDER';
export const UPDATE_DECK_SORTING = 'UPDATE_DECK_SORTING';

export const toggleDark = () => ({
  type: TOGGLE_DARK,
});

export const reverseDeckOrder = () => ({
  type: REVERSE_DECK_ORDER,
});

export const updateDeckSorting = (by) => ({
  type: UPDATE_DECK_SORTING,
  by,
});
