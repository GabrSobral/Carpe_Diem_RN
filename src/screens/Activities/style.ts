import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    overflow: 'scroll',
  },
  titleContainer: {
    width: '100%',
    backgroundColor: theme.colors.green300,
    borderRadius: 7,
    padding: 16,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  title: {
    color: theme.colors.white,
    fontSize: 32,
    zIndex: 10
  },
  subtitle: {
    color: theme.colors.gray100,
    textAlign: 'center',
  }
})