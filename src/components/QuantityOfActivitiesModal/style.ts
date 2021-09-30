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
    padding: 16,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.heading,
    color: theme.colors.text
  },
  description: {
    marginTop: 6,
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
    fontSize: 20,
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
    fontSize: 20,
    fontFamily: fonts.heading
  },
  selected:{
    backgroundColor: theme.colors.blue300,
    color: theme.colors.white
  }
})