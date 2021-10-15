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
    position: 'relative',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: theme.colors.text
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: fonts.text
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
    fontSize: 18,
    fontFamily: fonts.heading
  },
  button: {
    width: '49%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flex: 1,
    backgroundColor: theme.colors.gray100
  },
  deny: {
    marginRight: 16,
    backgroundColor: theme.colors.red900,
  },
  accept: {
    backgroundColor: theme.colors.green500,
  },
  disabled: {
    opacity: 0.5
  },

  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  buttonTextQuantity: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: fonts.heading
  },
  selected:{
    backgroundColor: theme.colors.blue300,
    color: theme.colors.white
  },

  inputContainer:{
    width: '100%',
    minWidth: '100%',
    marginTop: 12,
  },
  contactInput:{
    width: '100%',
    minWidth: '100%',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: theme.colors.gray200,
    padding: 12,
    textAlign: 'center'
  },
  contactbutton:{
    minWidth: '100%',
    borderRadius: 7,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.blue300
  },
  closeButton:{
    position:'absolute',
    right: 16,
    top: 16
  }
})