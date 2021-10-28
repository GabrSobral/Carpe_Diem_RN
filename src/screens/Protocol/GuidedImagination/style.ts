import { StyleSheet } from "react-native";
import fonts from "../../../styles/fonts";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    paddingVertical: 16
  },
  image: {
    position: 'absolute',
    flex: 1,
    backgroundColor: theme.colors.blue300
  },
  textContainer: {
    height: 130,
    borderRadius: 7,
    backgroundColor:  '#95959570',
    paddingHorizontal: 24,
    width: '90%',
    justifyContent: 'center'
  },
  text:{
    color: theme.colors.text,
    fontFamily: fonts.text,
    fontSize: 16,
    textAlign: 'center'
  },
  currentText:{
    color: theme.colors.white,
  },
  button: {
    backgroundColor: theme.colors.blue400,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:40
  }
})