import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  inputcontainer: {
    width: '100%',
    marginBottom: 10
  },
  inputText: {
    position: 'absolute',
    fontFamily: fonts.text,
    top: 20,
    left: 16,
    zIndex: 5,
    color: theme.colors.gray500,
  },
  inputTextActive: {
    top: 0,
    color: theme.colors.blue300
  },
  input: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 45,
    height: 55,
    zIndex: 1,
    borderBottomColor: theme.colors.gray200,
    borderBottomWidth: 1,
  },
  inputActive: {
    borderBottomColor: theme.colors.blue300,
  },
  inputIcon: {
    position: 'absolute',
    transform: [{ translateY: -12 }],
    top: '50%',
    right: 16,
  }
})