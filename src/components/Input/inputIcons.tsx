import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { theme } from '../../styles/theme'
import { styles } from './style'

interface InputIconsProps extends InputIconsTypes{
  isFocused: boolean;
  isFilled: boolean;
}
export interface InputIconsTypes {
  icon: "email" | "password" | 'lockOpen' | 'person'
}

export function InputIcons({ isFilled, isFocused, icon }: InputIconsProps){
  switch(icon){
    case 'email': 
    return <MaterialIcons 
            style={styles.inputIcon}
            size={24}
            name="mail" 
            color={(isFocused || isFilled) ? 
              theme.colors.blue300 :
              theme.colors.gray200}
          />

    case "password":
    return <MaterialIcons 
            style={styles.inputIcon}
            size={24}
            name="lock" 
            color={(isFocused || isFilled) ? 
              theme.colors.blue300 :
              theme.colors.gray200}
          />

    case "lockOpen":  
    return  <MaterialIcons 
              style={styles.inputIcon}
              size={24}
              name="lock-open" 
              color={(isFocused || isFilled) ? 
                theme.colors.blue300 :
                theme.colors.gray200}
            />
    case 'person':
    return  <MaterialIcons 
              style={styles.inputIcon}
              size={24}
              name="person" 
              color={(isFocused || isFilled) ? 
                theme.colors.blue300 :
                theme.colors.gray200}
            /> 
  }
}