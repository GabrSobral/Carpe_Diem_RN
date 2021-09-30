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
  closeModalButton:{
    marginLeft: 'auto'
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: theme.colors.text,
    textAlign: 'center'
  },
  description: {
    marginTop: 6,
    fontFamily: fonts.text,
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
    backgroundColor: theme.colors.blue300
  },
  disabled: {
    opacity: 0.5
  },

  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  feedbackButtonText: {
    fontSize: 23,
    fontFamily: fonts.text
  }
})