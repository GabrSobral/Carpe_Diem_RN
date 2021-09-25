import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    color: theme.colors.text
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  progressBarText: {
    position: 'absolute'
  }
})