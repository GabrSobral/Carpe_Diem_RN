import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  title : {
    fontSize: 34,
    color: theme.colors.text,
    fontFamily: fonts.heading,
  },
  questionContainer: {
    width: '100%',
    height: 120,
    borderRadius: 7,
    marginTop: 16,
    overflow: 'hidden',
    elevation: 3
  },
  questionTextContainer: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.gray100,
    paddingHorizontal: 18,
    justifyContent: 'center'
  },
  questionText: {
    color: theme.colors.text,
    fontFamily: fonts.text,
  },
  inputsContainer: {
    width: '100%',
    height: 70,
    backgroundColor: theme.colors.green300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18
  },
  errorMessage: {
    width: '100%',
    textAlign: 'left',
    color: theme.colors.red900,
    fontSize: 18,
    fontFamily: fonts.text,
  },
})