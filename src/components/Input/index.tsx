import React, { useState } from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'
import { styles } from './style'

interface InputProps extends TextInputProps{
  title: string;
  isFilled: boolean;
}

export function Input({ title, isFilled,...rest }: InputProps){
  const [ isFocused, setIsFocused ] = useState(false)

  return(
    <View style={styles.inputcontainer}>
      <Text 
        style={
          isFocused || isFilled ? 
            styles.inputTextActive : 
            styles.inputText }
      >
        {title}
      </Text>

      <TextInput 
        style={
          isFocused || isFilled ? 
            styles.inputActive : 
            styles.input }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  )
}