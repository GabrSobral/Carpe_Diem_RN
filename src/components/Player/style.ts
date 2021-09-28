import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 7,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue300
  },
  controlButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.blue600,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderContainer: {
    padding: 6,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  duration: {
    color: theme.colors.white
  },
  slider: {
    height: 3,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: theme.colors.gray100
  }
})