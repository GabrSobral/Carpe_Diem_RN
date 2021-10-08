import { StyleSheet } from "react-native";
import fonts from "../../../styles/fonts";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor:"#00000099",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup:{
    width: '90%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    alignItems: 'center'
  },
  titleAndDescriptionContainer:{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: fonts.heading,
    textAlign: 'center'
  },
  description: {
    marginTop: 12,
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.text,
  },

  finalButtonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  repeatAndNextContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: fonts.heading,
    fontSize: 16
  },
  button: {
    width: "48.5%",
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.blue300
  },
  returnToHomeButton:{
    backgroundColor: theme.colors.red300,
    width: '100%',
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  singleButton: {
    marginTop: 16,
    width: '100%',
    borderRadius: 7,
    backgroundColor: theme.colors.blue300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },

  disabled: {
    opacity: 0.5
  },
})