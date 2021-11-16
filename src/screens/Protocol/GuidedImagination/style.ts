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
    height: 260,
    borderRadius: 7,
    paddingVertical: 12,
    backgroundColor:  '#95959570',
    width: '100%',
    justifyContent: 'center'
  },
  video: {
    flex: 1, 
    borderRadius: 7, 
    opacity: 0.6 
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