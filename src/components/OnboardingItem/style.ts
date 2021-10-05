import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    marginBottom: 18,
    color: theme.colors.text,
    textAlign: 'center'
  },
  description: {
    fontFamily: fonts.text,
    color: theme.colors.text,
    textAlign: 'center',
    paddingHorizontal: 64
  }
})