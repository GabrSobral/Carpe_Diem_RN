import React, { useState } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from './style'
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
  const { navigate } = useNavigation()
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  async function SignIn(){
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      navigate('Questionnaire')
    }, 1300)
  }

  return (
    <View style={styles.container}>
      <StatusBar  
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <SignHeader title="Cadastrar"/>

      <View style={styles.formContainer}>
        <Input 
          title="Nome"
          isFilled={!!name}
          onChangeText={setName}
          value={name}
          keyboardType="default"
        />

        <Input 
          title="Email"
          isFilled={!!email}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <Input 
          title="Senha"
          isFilled={!!password}
          onChangeText={setPassword}
          value={password}
          keyboardType="default"
          textContentType="password"
        />

        <Input 
          title="Confirmação de senha"
          isFilled={!!confirmPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          keyboardType="default"
          textContentType="password"
        />

        <Button
          title="Confirmar"
          isLoading={isLoading}
          onPress={SignIn}
          disabled={(name && email && password && confirmPassword && !isLoading) ? false : true}
        />
      </View>
    </View>
  );
}


