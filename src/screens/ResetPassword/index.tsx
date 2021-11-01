import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Text, View, KeyboardAvoidingView } from 'react-native';

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from '../SignIn/style'
import { api } from '../../services/api';
import { ModalComponent } from '../../components/Modal';

interface Params {
  email: string;
  code: string;
}

export function ResetPassword(){
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const [ isModalVisible, setIsModalVisible ] = useState(false)
  const [ isModalTokenVisible, setIsModalTokenVisible ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")

  const { params } = useRoute()
  const { navigate } = useNavigation()
  const { email, code } = params as Params

  async function resetPassword(){
    if(confirmPassword !== password)
      return setErrorMessage("As duas senhas não estão iguais!")

    setIsLoading(true);
    try{
      await api.post('/users/reset-password', { email, token: code, newPassword: password })
      setIsModalVisible(true)

    } catch(error: any) {
      if(error.response.data.error === "Password token invalid")
        return setIsModalTokenVisible(true)

      setErrorMessage(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return(
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <ModalComponent
        closeModal={() => setIsModalVisible(false)}
        title="Sucesso!"
        animation="password"
        description="Sua senha foi alterada com sucesso 😃"
        isVisible={isModalVisible}
        confirmFunction={() => { setIsModalVisible(false); navigate('SignIn')}}
        finishButtonText="Voltar à tela de login"
      />
      <ModalComponent
        closeModal={() => setIsModalVisible(false)}
        title="Opa!"
        description="Seu código de verificação está inválido, tente novamente!"
        isVisible={isModalTokenVisible}
        confirmFunction={() => { setIsModalVisible(false); navigate('InsertCode', { email })}}
        finishButtonText="Inserir novamente"
      />
      <SignHeader title="Senha"/>
      
      <Text style={styles.forgotPasswordTitle}>
        Insira sua nova senha.
      </Text>

      <KeyboardAvoidingView style={styles.formContainer} behavior='height'>
        <Input 
          secureTextEntry={true}
          icon="password"
          title="Nova senha"
          isFilled={!!password}
          onChangeText={setPassword}
          value={password}
          textContentType="password"
        />
        <Input 
          secureTextEntry={true}
          icon="lockOpen"
          title="Confirme nova senha"
          isFilled={!!confirmPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          textContentType="password"
        />

        { errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <Button
          title="Confirmar"
          isLoading={isLoading}
          onPress={resetPassword}
          disabled={(password && confirmPassword && !isLoading) ? false : true}
        />
      </KeyboardAvoidingView>

      <View/>
    </View>
  )
}