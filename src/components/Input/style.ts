import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  inputcontainer: {
    width: '100%',
    marginBottom: 10
  },
  inputText: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 5,
    color: theme.colors.gray500,
  },
  inputTextActive: {
    position: 'absolute',
    top: 0,
    left: 16,
    zIndex: 5,
    color: theme.colors.blue300
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    height: 55,
    zIndex: 1,
    borderBottomColor: theme.colors.gray200,
    borderBottomWidth: 1,
  },
  inputActive: {
    width: '100%',
    paddingHorizontal: 16,
    height: 55,
    zIndex: 1,
    borderBottomColor: theme.colors.blue300,
    borderBottomWidth: 1,
  }
})