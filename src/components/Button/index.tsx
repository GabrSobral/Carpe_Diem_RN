import React from 'react'
import {} from '@expo/vector-icons'
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text, ActivityIndicator } from 'react-native'
import { styles } from './style'
import { theme } from '../../styles/theme';

interface ButtonProps extends RectButtonProps {
  title: string;
  isLoading: boolean;
  disabled: boolean;
  isGreen?: boolean;
}

export function Button({ title, isLoading, disabled, isGreen, ...rest }: ButtonProps){
  return (
    <RectButton
      activeOpacity={0.6}
      rippleColor={theme.colors.blue600}
      style={[
        styles.container, 
        (isLoading || disabled) && styles.disabled,
        isGreen && { backgroundColor: theme.colors.green300 }
      ]}
      enabled={!(isLoading || disabled)}
      {...rest}
    >
      { isLoading ? (
        <ActivityIndicator size={32} color={theme.colors.white}/>
      ) : (
        <Text style={styles.title}>{title}</Text>
      ) }
    </RectButton>
  )
}