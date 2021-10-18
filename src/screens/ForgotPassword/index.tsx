import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from '../SignIn/style'
import { api } from '../../services/api';
import { ModalComponent } from '../../components/Modal';
import { useNavigation } from '@react-navigation/core';

export function ForgotPassword(){
  const [ isModalVisible, setIsModalVisible ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ email, setEmail ] = useState('')
  const { goBack } = useNavigation()

  async function SendMail(){
    setIsLoading(true);
    try{
      await api.post('/users/forgot-password', { email })
      setIsModalVisible(true)
    } catch(error: any) {
      setErrorMessage(error.response.data.error)
    } finally { setIsLoading(false) }
  }
  
  return(
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <ModalComponent
        closeModal={() => setIsModalVisible(false)}
        isVisible={isModalVisible}
        title="Enviado..."
        animation="sendMail"
        description={`Nós enviamos um email com uma chave para trocar a sua senha, verifique na sua [caixa principal.${'\n'}(lembre-se de verificar na sua caixa de spam também).`}
        confirmFunction={() => {
          setIsModalVisible(false)
          goBack()
        }}
      />
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