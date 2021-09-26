import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: "100%",
    padding: 16,
    borderRadius: 7,
    backgroundColor: theme.colors.blue300,
    flexDirection: 'row',
    elevation: 3
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: theme.colors.blue600
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    textAlign: 'left'
  },
  subtitle: {
    color: theme.colors.gray100
  }
})