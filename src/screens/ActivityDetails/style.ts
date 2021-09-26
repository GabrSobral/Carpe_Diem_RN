import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 0
  },
  titleContainer: {
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
  contentSelectedContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    textAlign: 'left'
  },
  subtitle: {
    color: theme.colors.gray100
  },
  bodyContainer: {
    width: '100%',
    borderRadius: 7,
    backgroundColor: theme.colors.gray50,
    padding: 16,
    marginVertical: 16,
  },
  body: {
    color: theme.colors.text
  },
  feedbackTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  feedbackText: {
    color: theme.colors.text
  },
  feedbackButtonText:{
    fontSize: 16,
    padding: 5,
    color: theme.colors.blue300,
    fontWeight: 'bold'
  }
})