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
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: fonts.heading,
  },
  description: {
    marginTop: 6,
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.text,
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
    fontSize: 20
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
    height: 15,
    overflow: 'hidden',
    borderRadius: 7,
    marginTop: 16,
    backgroundColor: theme.colors.gray100
  },
  slider: {
    height: '100%',
    width: 80,
    backgroundColor: theme.colors.blue300
  },
  buttonTextQuantity: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  selected:{
    backgroundColor: theme.colors.blue300,
    color: theme.colors.white
  }
})