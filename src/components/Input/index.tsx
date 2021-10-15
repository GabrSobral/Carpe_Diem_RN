import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TextInputProps, Animated } from 'react-native'
import { InputIcons, InputIconsTypes } from './inputIcons'
import { styles } from './style'

interface InputProps extends TextInputProps{
  title: string;
  isFilled: boolean;
}

export function Input({ title, isFilled, icon, ...rest }: InputProps & InputIconsTypes){
  const [ isFocused, setIsFocused ] = useState(false)

  const animation = useRef(new Animated.Value(0)).current
  
  function Motion(value: 0 | 1, duration = 300){
    Animated.timing(animation, {
      toValue: value,
      duration: duration,
      useNativeDriver: false
    }).start();
  }

  return(
    <View style={styles.inputcontainer}>
      <Animated.Text style={[styles.inputText, (isFocused || isFilled) && styles.inputTextActive]}>
        {title}
      </Animated.Text>

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