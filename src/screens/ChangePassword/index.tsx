import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ModalComponent } from '../../components/Modal';

import { styles } from './style'
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';

export function ChangePassword() {
  const [ currentPassword, setCurrentPassword ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isModalVisible, setIsModalVisible ] = useState(false)

  const { goBack } = useNavigation()

  async function Change(){
    if(newPassword !== confirmPassword){
      setErrorMessage("Senhas não estão iguais!")
      return
    }
    setIsLoading(true)
    try{
      await api.post('/users/change-password', { 
        oldPassword: currentPassword,
        newPassword
      })
      setIsModalVisible(true)
    } catch(error: any){
      setErrorMessage(error.response.data.error)
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ModalComponent
        closeModal={() => setIsModalVisible(false)}
        title="Sucesso!"
        description="Sua senha foi alterada com sucesso 😃"
        isVisible={isModalVisible}
      />
      <SignHeader title="Senha" button="Voltar"/>

      <View style={styles.formContainer}>
        <Input 
          secureTextEntry={true}
          icon="key"
          title="Senha atual"
          isFilled={!!currentPassword}
          onChangeText={setCurrentPassword}
          value={currentPassword}
          textContentType="password"
        />

        <Input 
          secureTextEntry={true}
          icon="password"
          title="Senha nova"
          isFilled={!!newPassword}
          onChangeText={setNewPassword}
          value={newPassword}
          textContentType="password"
        />

        <Input 
          secureTextEntry={true}
          icon="lockOpen"
          title="Confirme senha nova"
          isFilled={!!confirmPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          textContentType="password"
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <Button
          title="Salvar"
          isLoading={isLoading}
          onPress={Change}
          disabled={(currentPassword && newPassword && confirmPassword && !isLoading) ? false : true}
        />
      </View>
    </View>
  );
}


