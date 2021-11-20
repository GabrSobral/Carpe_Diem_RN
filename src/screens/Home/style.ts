import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.text,
    marginVertical: 6,
    color: theme.colors.text
  },
  noMoreActivitiesContainer:{
    zIndex: 10,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  noMoreActivitiesText:{
    fontFamily: fonts.text,
    color: theme.colors.text
  },
  titleContainer: {
    width: '100%',
    backgroundColor: theme.colors.green300,
    borderRadius: 7,
    padding: 16,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  titleActivities: {
    color: theme.colors.white,
    fontSize:24,
    zIndex: 10
  },
  subtitle: {
    color: theme.colors.gray100,
    textAlign: 'center',
    fontSize: 14
  },
})