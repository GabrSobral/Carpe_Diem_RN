import React, { useState } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from './style'
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../../contexts/UserContext';

export function SignUp() {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')
  
  const { navigate } = useNavigation() as any
  const { Sign } = useUsers()

  async function SignUp(){
    name.trim()
    email.trim()
    
    if(password !== confirmPassword){
      return setErrorMessage("Sua confirmação de senha está inválida!")
    }
    setIsLoading(true)
    
    const result = await Sign({name, email, password, query: "/users"})
    if(result.message === "ok") {
      navigate('Questionnaire')
    } else {
      setErrorMessage(result.message)
      setIsLoading(false)
    }
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
          icon="person"
          title="Nome"
          isFilled={!!name}
          onChangeText={setName}
          value={name}
          keyboardType="default"
        />

        <Input 
          icon="email"
          title="Email"
          isFilled={!!email}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <Input 
          icon="password"
          title="Senha"
          isFilled={!!password}
          onChangeText={setPassword}
          value={password}
          keyboardType="default"
          textContentType="password"
        />

        <Input 
          icon="password"
          title="Confirmação de senha"
          isFilled={!!confirmPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          keyboardType="default"
          textContentType="password"
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <Button
          title="Confirmar"
          isLoading={isLoading}
          onPress={SignUp}
          disabled={(name && email && password && confirmPassword && !isLoading) ? false : true}
        />
      </View>
    </View>
  );
}


