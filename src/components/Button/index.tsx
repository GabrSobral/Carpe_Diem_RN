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
}

export function Button({ title, isLoading, disabled, ...rest }: ButtonProps){
  return (
    <RectButton
      style={[styles.container, disabled && styles.disabled]}
      enabled={!disabled}
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