import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    overflow: 'hidden',
    borderRadius: 7,
    alignItems: 'center'
  },
  optionsButton: {
    width: '100%',
    height: 65,
    borderRadius: 7,
    backgroundColor: theme.colors.gray50,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2
  },
  itemText: {
    color: theme.colors.text,
    fontSize: 19
  },
  optionsContainer: {
    width: '100%',
    height: 0,
    backgroundColor: theme.colors.gray100,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  optionItemButton: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 60,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionItemText: {
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'left'
  }
})