import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
 
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  feedbackButtonText: {
    fontSize: 18,
    fontFamily: fonts.text
  }
})