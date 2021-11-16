import React, { useState } from 'react';
import { Text, View, StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from './style'
import { useUsers } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/core';

export function SignIn() {
  const { navigate } = useNavigation()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")

  const { Sign } = useUsers()

  async function SignIn(){
    Keyboard.dismiss();
    setIsLoading(true);

    const result = await Sign({ email, password });
    if(result.message !== "ok") {
      setErrorMessage(result.message)
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <SignHeader title="Entrar" button="Cadastrar"/>

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

        <Input 
          secureTextEntry={true}
          icon="password"
          title="Senha"
          isFilled={!!password}
          onChangeText={setPassword}
          value={password}
          textContentType="password"
        />

        { errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <RectButton onPress={() => navigate('ForgotPassword' as never)}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </RectButton>

        <Button
          title="Entrar"
          isLoading={isLoading}
          onPress={SignIn}
          disabled={(email && password && !isLoading) ? false : true}
        />
      </KeyboardAvoidingView>
    </View>
  );
}


