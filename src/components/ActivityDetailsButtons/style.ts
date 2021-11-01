import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  handleButtonsContainer: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: 7,
    overflow: 'hidden',
    marginTop: 16
  },
  handleButton: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  reject:{
    backgroundColor: theme.colors.red900,
  },
  confirm:{
    backgroundColor: theme.colors.green500
  },
  handleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white
  }
})