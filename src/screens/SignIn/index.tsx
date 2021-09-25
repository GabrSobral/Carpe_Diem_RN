import React, { useState } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from './style'
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const { navigate } = useNavigation()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
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

      <SignHeader title="Entrar"/>

      <View style={styles.formContainer}>
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
          textContentType="password"
        />

        <RectButton>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </RectButton>

        <Button
          title="Entrar"
          isLoading={isLoading}
          onPress={SignIn}
          disabled={(email && password && !isLoading) ? false : true}
        />
      </View>
    </View>
  );
}


