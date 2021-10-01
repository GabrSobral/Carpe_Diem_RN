import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  titleContainer: {
    width: '100%',
    backgroundColor: theme.colors.green300,
    borderRadius: 7,
    padding: 16,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center'
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