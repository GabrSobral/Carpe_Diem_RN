import React, { useState } from 'react'
import { View, TextInput, TextInputProps } from 'react-native'
import { theme } from '../../../styles/theme'
import { styles } from '../../QuantityOfActivitiesModal/style'

interface InputContactProps extends TextInputProps{
  isFilled: boolean;
}

export function InputContact({ isFilled, ...rest }: InputContactProps){
  const [ isFocused, setIsFocused ] = useState(false)

  return(
    <View style={styles.inputContainer}>
      <TextInput
        keyboardType="number-pad"
        maxLength={15}
        style={[styles.contactInput, (isFocused || isFilled) && { borderColor: theme.colors.blue300 }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="(xx) xxxxx-xxxx"
        {...rest}
      />
    </View>
  )
}