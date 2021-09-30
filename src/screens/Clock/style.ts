import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  title: {
    fontSize: 32,
    color: theme.colors.text,
    fontFamily: fonts.heading,
  },
  circularContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray100
  },
  circularFill: {
    width: 0,
    height: 0,
    elevation: 5,
    backgroundColor: theme.colors.blue400
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
})