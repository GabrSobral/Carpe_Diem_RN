import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 7,
    backgroundColor: theme.colors.blue300,
    flexDirection: 'row',
    elevation: 3,
    marginBottom: 8,
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: theme.colors.blue600,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 19,
    textAlign: 'left',
    fontFamily: fonts.heading,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  subtitle: {
    color: theme.colors.gray100,
    fontFamily: fonts.text,
    fontSize: 12
  },
  buttonRemove:{
    height: "100%",
    width: 106,
    borderRadius: 16,
    borderTopRightRadius: 10,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: theme.colors.blue600,
    paddingLeft: 15,
    transform: [{ translateX: -16}],
  }
})