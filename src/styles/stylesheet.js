import { StyleSheet, Platform } from 'react-native';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  actionBtnRow: {
    flexDirection: 'row',
  },
  deckTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  deckTitleInput: {
    flex: 1,
    margin: 5,
    fontSize: 20,
  },
  bottomActionBtn: {
    margin: 5,
    ...Platform.select({
      ios: {
        elevation: 0,
      },
    }),
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Styles;
