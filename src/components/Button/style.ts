import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    borderRadius: 7,
    backgroundColor: theme.colors.blue300,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 16
  },
  disabled: {
    opacity: 0.5
  },
  title: {
    color: theme.colors.white,
    fontSize: 22
  }
})