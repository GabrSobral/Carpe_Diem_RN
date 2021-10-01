import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  formContainer : {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorMessage: {
    width: '100%',
    textAlign: 'left',
    color: theme.colors.red900,
    fontSize: 18,
    fontFamily: fonts.text,
  },
  forgotPasswordText: {
    color: theme.colors.blue300,
    fontSize: 18,
    fontFamily: fonts.text,
  }
});