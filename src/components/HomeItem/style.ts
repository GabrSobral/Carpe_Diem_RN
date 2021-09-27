import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 7,
    backgroundColor: theme.colors.blue300,
    flexDirection: 'row',
    elevation: 3,
    marginBottom: 16
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.blue600
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
  },
  subtitle: {
    color: theme.colors.gray100
  }
})