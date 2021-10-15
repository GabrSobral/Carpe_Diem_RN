import { StyleSheet } from 'react-native'
import fonts from '../../styles/fonts'
import { theme } from '../../styles/theme'

export const styles = StyleSheet.create({
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
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.blue600
  },
  editButton:{
    position: 'absolute',
    right: 16,
    top: 16,
    borderRadius: 7,
    padding: 5
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    zIndex: 5
  },
  imageButton:{
    flex: 1, 
    width: 120, 
    height: 120, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  removeImageButton:{
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: "center",
    zIndex: 15,
    elevation: 10
  },
  opacityBackgroundImage:{ 
    flex: 1, 
    backgroundColor: "#00000066", 
    width: 120, 
    height: 120, 
    borderRadius: 60,
    zIndex: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName: {
    color: theme.colors.white,
    fontSize: 18,
    fontFamily: fonts.text,
    minWidth: '100%',
  },
  inputNameContainer:{
    flex: 1,
    width: '100%',
    paddingHorizontal: 5
  },
  inputName:{
    flex: 1,
    paddingHorizontal: 16,
    color: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white,
    fontSize: 16,
    fontFamily: fonts.text
  },
  saveNameButton:{
    width: '100%',
    backgroundColor: theme.colors.green100,
    borderRadius: 7,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  registratedAt: {
    position: 'absolute',
    bottom: 18,
    right: 16,
    color: theme.colors.gray100,
    fontSize: 13,
    fontFamily: fonts.text,
  },
})