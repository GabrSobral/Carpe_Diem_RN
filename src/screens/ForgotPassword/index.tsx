import React, { useState } from 'react';
import { Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from '../SignIn/style'
import { api } from '../../services/api';

export function ForgotPassword(){
  const [ email, setEmail ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")

  async function SendMail(){
    setIsLoading(true);
    const { data } = await api.post('/forgot-password', { email })

    if(data.response.data.error)
     setErrorMessage(data.response.data.error)

    setIsLoading(false)
  }
  
  return(
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <SignHeader title="Senha" button="Entrar"/>
      
      <Text style={styles.forgotPasswordTitle}>
        Insira seu email para {'\n'}sabermos quem é você.
      </Text>

      <KeyboardAvoidingView style={styles.formContainer} behavior='height'>
        <Input 
          icon="email"
          title="Email"
          isFilled={!!email}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        { errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <Button
          title="Confirmar"
          isLoading={isLoading}
          onPress={SendMail}
          disabled={(email && !isLoading) ? false : true}
        />
      </KeyboardAvoidingView>

      <View/>
    </View>
  )
}