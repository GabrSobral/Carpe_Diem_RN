import React, { useEffect, useRef, useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { SignHeader } from '../../components/SignHeader'

import { styles } from '../SignIn/style'
import { useNavigation, useRoute } from '@react-navigation/core';

interface Params {
  email: string;
}

export function InsertCode(){
  const [ value, setValue ] = useState('')

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  
  const { navigate } = useNavigation() as any
  const { params } = useRoute()
  const { email } = params as Params

  useEffect(() => {
    if(value.length === CELL_COUNT)
      return navigate('ResetPassword', { code: value, email })
  },[value, email])

  return(
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <SignHeader title="Senha"/>
      
      <Text style={styles.forgotPasswordTitle}>
        Insira o código que enviamos{'\n'}para o seu e-mail.
      </Text>

      <KeyboardAvoidingView style={styles.formContainer} behavior='height'>
        <View style={styles.InputCodecontainer}>
          <CodeField
           ref={ref}
           {...props}
           value={value}
           onChangeText={setValue}
           cellCount={CELL_COUNT}
           rootStyle={styles.InputCodecontainer}
           keyboardType="number-pad"
           textContentType="oneTimeCode"
           renderCell={({index, symbol, isFocused}) => (
             <Text
               key={index}
               style={[styles.cell, isFocused && styles.focusCell]}
               onLayout={getCellOnLayoutHandler(index)}>
               {symbol || (isFocused ? <Cursor /> : null)}
             </Text>
           )}
          />
        </View>
      </KeyboardAvoidingView>

      <View/>
    </View>
  )
}