import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  buttonContainer : {
    alignItems: 'center'
  },
  button: {
    height: 32,
    width: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.blue600,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.blue600,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  }
})