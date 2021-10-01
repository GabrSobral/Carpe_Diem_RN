import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    textAlign: 'left',
    fontFamily: fonts.heading,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    color: theme.colors.gray100,
    fontFamily: fonts.text
  }
})