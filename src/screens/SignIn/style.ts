import { Platform, StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  formContainer : {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.colors.white
  },
  errorMessage: {
    width: '100%',
    textAlign: 'left',
    color: theme.colors.red900,
    fontSize: 12,
    fontFamily: fonts.text,
  },
  forgotPasswordText: {
    color: theme.colors.blue300,
    fontSize: 16,
    fontFamily: fonts.text,
  },

  forgotPasswordTitle:{
    width: '100%',
    fontSize: 24,
    fontFamily: fonts.heading,
    color: theme.colors.text,
    transform: [{ translateY: 40 }]
  },
  
  InputCodecontainer:{
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    marginHorizontal: 8,
    height: 70,
    width: 70,
    lineHeight: 80,
    fontSize: 45,
    textAlign: 'center',
    borderRadius: 7,
    color: theme.colors.blue300,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.gray200,

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    

    // Android
    elevation: 3,
  },
  focusCell: {
    borderColor: theme.colors.blue300
  }
});