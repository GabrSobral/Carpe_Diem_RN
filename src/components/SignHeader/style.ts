import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
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
    fontSize: 30,
    fontFamily: fonts.heading,
    color: theme.colors.text
  },
  Button: {
    position: 'absolute',
    right: 0,
  },
  titleButton: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: theme.colors.blue300
  },
})