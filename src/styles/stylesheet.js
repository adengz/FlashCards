import { StyleSheet, Dimensions, Platform } from 'react-native';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flipCardContainer: {
    width: Dimensions.get('window').width * 0.9,
  },
  flipCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 2,
  },
  deckTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  deckTitleInput: {
    flex: 1,
    margin: 5,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  actionBtnRow: {
    flexDirection: 'row',
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
  },
});

export default Styles;
