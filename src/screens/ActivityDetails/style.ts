import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 0
  },
  titleContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 7,
    backgroundColor: theme.colors.blue300,
    flexDirection: 'row',
    elevation: 3,
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: theme.colors.blue600,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentSelectedContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    fontSize: 19,
    textAlign: 'left',
    fontFamily: fonts.heading,
  },
  subtitle: {
    color: theme.colors.gray100,
    fontFamily: fonts.text,
    fontSize: 14
  },
  bodyContainer: {
    width: '100%',
    borderRadius: 7,
    backgroundColor: theme.colors.gray50,
    padding: 16,
    marginVertical: 16,
  },
  body: {
    color: theme.colors.text,
    fontFamily: fonts.text,
  },
  feedbackTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  feedbackText: {
    color: theme.colors.text,
    fontFamily: fonts.text,
  },
  feedbackButtonText:{
    fontSize: 16,
    padding: 5,
    color: theme.colors.blue300,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
  }
})