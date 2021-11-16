import { StyleSheet } from 'react-native'
import fonts from '../../styles/fonts'
import { theme } from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white
  },
  skipButton: {
    position: 'absolute',
    right: 25,
    top: 45,
    zIndex: 10
  },
  skipButtonText: {
    color: theme.colors.blue600
  }
})