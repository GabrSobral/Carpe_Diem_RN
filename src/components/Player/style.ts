import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 7,
    padding: 8,
    backgroundColor: theme.colors.blue300
  },
  controlButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.blue600,
    justifyContent: 'center',
    alignItems: 'center'
  }
})