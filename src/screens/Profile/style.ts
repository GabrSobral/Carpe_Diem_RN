import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  }, 

  profileContentContainer: {
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.white,
    transform: [{ translateY: -12 }]
  },
  profileContentItemContainer:{
    marginTop: 12,
    backgroundColor: theme.colors.gray100,
    borderRadius: 7,
    overflow: 'hidden'
  },
  profileContentItem: {
    width: '100%',
    height: 65,
    borderRadius: 7,
    backgroundColor: theme.colors.gray50,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6
  },
  profileContentButton: {
    width: '100%',
    height: 65,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContentItemText: {
    color: theme.colors.text,
    fontSize: 16
  },
  profileContentValueText: {
    color: theme.colors.blue300,
    fontSize: 28,
    fontWeight: 'bold'
  },

  logoutButtonContainer: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: theme.colors.red900,
    borderRadius: 7,
  },
  logoutButton: {
    position: 'relative',
    padding: 8,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.red900,
  },
  logoutText: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -14 }],
    color: theme.colors.red300,
    fontWeight: 'bold',
    fontSize: 18
  }
})