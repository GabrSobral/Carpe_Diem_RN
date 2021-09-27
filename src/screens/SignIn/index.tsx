import React, { useState } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from './style'
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../../contexts/UserContext';

export function SignIn() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")

  const { Sign } = useUsers()
  const { navigate } = useNavigation() as any

  async function SignIn(){
    setIsLoading(true);

    const result = await Sign({ email, password });
    if(result.message === "ok") {
      if(result.data.user.hasAnswered === true) {
        setIsLoading(false);
        navigate("Home")
        return;
      } else{
        setIsLoading(false)
        navigate("Questionnaire");
        return;
      }
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

      <SignHeader title="Entrar"/>

      <View style={styles.formContainer}>
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
          textContentType="password"
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>

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


