import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.text,
    marginBottom: 16,
    color: theme.colors.text
  },
  progressBarText: {
    position: 'absolute'
  }
})