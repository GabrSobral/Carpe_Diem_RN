import { Platform, StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: theme.colors.blue300,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  animation: {
    height: 250,
    zIndex: 5
  },
  title: {
    fontFamily: fonts.heading,
    color: theme.colors.white,
    fontSize: 18,
    transform: [{ translateY: 40 }],
    zIndex: 10
  },
  description: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: theme.colors.white,
    fontSize: 14
  },
  contentContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    width: '90%',
    borderRadius: 7,
    backgroundColor: theme.colors.blue400,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeText: {
    fontFamily: fonts.heading,
    color: theme.colors.white,
    fontSize: 16
  }
});