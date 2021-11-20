import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    height: 16,
    backgroundColor: theme.colors.gray100,
    borderRadius: 7,
    marginBottom: 32
  },
  progressBar: {
    height: 16,
    width: '50%',
    borderRadius: 7,
    backgroundColor: theme.colors.green300,
    alignItems: 'flex-end'
  },
  progressBarText: {
    position: 'absolute',
    right: 0,
    color: theme.colors.text,
    transform: [{ translateY: 20 }],
    fontFamily: fonts.text,
  }
})