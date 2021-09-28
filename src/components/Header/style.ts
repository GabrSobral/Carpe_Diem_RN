import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 30,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 5,
    borderBottomColor: theme.colors.gray100,
  },
  nameContainer: {
    flexDirection: 'row'
  },
  nameGreeting: {
    fontSize: 24,
    color: theme.colors.text
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 7,
    color: theme.colors.text
  }
})