import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  }, 

  profileHeaderContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.colors.blue300,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    elevation: 5,
    marginRight: 8
  },
  userName: {
    color: theme.colors.white,
    fontSize: 18,
  },
  registratedAt: {
    position: 'absolute',
    bottom: 18,
    right: 16,
    color: theme.colors.gray100,
    fontSize: 12
  },

  profileContentContainer: {
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.white,
    transform: [{ translateY: -12 }]
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
  },
  profileContentItemText: {
    color: theme.colors.text,
    fontSize: 19
  },
  profileContentValueText: {
    color: theme.colors.blue300,
    fontSize: 24,
    fontWeight: 'bold'
  },

  logoutButtonContainer: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: theme.colors.red300,
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
    borderWidth: 5,
    borderColor: theme.colors.red300,
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