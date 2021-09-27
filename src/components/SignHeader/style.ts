import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: "100%",
    marginTop: 30,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  Button: {
    position: 'absolute',
    right: 0,
  },
  titleButton: {
    fontWeight: "600",
    fontSize: 18,
    color: theme.colors.blue300
  },
})