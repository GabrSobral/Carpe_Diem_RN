import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from '../SignIn/style'
import { api } from '../../services/api';

export function ResetPassword(){
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")

  async function ResetPassword(){
    setIsLoading(true);
    const {data} = await api.post('/users/reset-password', 
      { email: "", token: "", newPassword: password })

    if(data.response.data.error)
     setErrorMessage(data.response.data.error)

    setIsLoading(false)
  }
  
  return(
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <SignHeader title="Senha" button="Entrar"/>
      
      <Text style={styles.forgotPasswordTitle}>
        Insira sua nova senha.
      </Text>

      <KeyboardAvoidingView style={styles.formContainer} behavior='height'>
        <Input 
          icon="password"
          title="Nova senha"
          isFilled={!!password}
          onChangeText={setPassword}
          value={password}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Input 
          icon="lockOpen"
          title="Confirme nova senha"
          isFilled={!!confirmPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        { errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <Button
          title="Confirmar"
          isLoading={isLoading}
          onPress={ResetPassword}
          disabled={(password && confirmPassword && !isLoading) ? false : true}
        />
      </KeyboardAvoidingView>

      <View/>
    </View>
  )
}