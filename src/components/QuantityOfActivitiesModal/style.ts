import { StyleSheet } from "react-native";
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
    fontWeight: 'bold',
    color: theme.colors.text
  },
  description: {
    marginTop: 6,
    color: theme.colors.text,
    textAlign: 'center'
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
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
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