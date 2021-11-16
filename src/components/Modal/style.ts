import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor:"#00000099",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup:{
    width: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: fonts.heading
  },
  description: {
    marginTop: 6,
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 13
  },

  dualButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: fonts.heading,
    fontSize: 18
  },
  button: {
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  deny: {
    width: '49%',
    backgroundColor: theme.colors.red900,
  },
  accept: {
    width: '49%',
    backgroundColor: theme.colors.green500,
  },
  disabled: {
    opacity: 0.5
  },

  finishButton: {
    width: '100%',
    backgroundColor: theme.colors.blue300
  },

  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200
  }
})