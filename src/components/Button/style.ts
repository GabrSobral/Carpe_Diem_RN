import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
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
    fontSize: 18,
    fontFamily: fonts.heading
  }
})