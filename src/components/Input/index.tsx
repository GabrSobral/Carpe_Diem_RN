import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'
import { theme } from '../../styles/theme'
import { InputIcons, InputIconsTypes } from './inputIcons'
import { styles } from './style'

interface InputProps extends TextInputProps{
  title: string;
  isFilled: boolean;
}

export function Input({ title, isFilled, icon, ...rest }: InputProps & InputIconsTypes){
  const [ isFocused, setIsFocused ] = useState(false)

  return(
    <View style={styles.inputcontainer}>
      <Text 
        style={[
          styles.inputText, 
          (isFocused || isFilled) && styles.inputTextActive]}
      >
        {title}
      </Text>

      <TextInput 
        style={[styles.input, (isFocused || isFilled) && styles.inputActive]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />

      <InputIcons icon={icon} isFilled={isFilled} isFocused={isFocused}/>
    </View>
  )
}