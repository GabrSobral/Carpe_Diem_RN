import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';

import { SignHeader } from '../../components/SignHeader'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { styles } from '../SignIn/style'
import { api } from '../../services/api';
import { ModalComponent } from '../../components/Modal';
import { useNavigation } from '@react-navigation/core';
import { InputContact } from '../../components/ContactModal/InputContact';
import { useUsers } from '../../contexts/UserContext';
import fonts from '../../styles/fonts';

export function EmergencyNumber(){
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ mask, setMask ] = useState<string>('')
  const { navigate } = useNavigation() as any
  const { handleUpdate } = useUsers()

  function handleInputChange(value: string){
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")

    setMask(value)
    return value
  }

  async function confirmFunction(){
    const data = new FormData()

    const numberWithoutSpecialCharacters = `55${mask.replace(/[^\w]/gi, '')}`

    data.append('emergency_number', numberWithoutSpecialCharacters)

    await api.patch('/users', data)
    await handleUpdate({ emergency_number: numberWithoutSpecialCharacters})
    navigate('QuestionnaireInitial')
  }
  
  return(
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <SignHeader title="Emergência" button="Pular"/>
      
      <Text style={[styles.forgotPasswordTitle, { fontSize: 16, fontFamily: fonts.text }]}>
        Salve um número de telefone de alguém de sua confiança, para mandarmos uma mensagem via
        <Text style={{ fontFamily: fonts.heading }}> WhatsApp </Text> 
        para alertá-lo, caso o protocolo de crises seja acionado
      </Text>

      <KeyboardAvoidingView style={styles.formContainer} behavior='height'>
          <InputContact 
            isFilled={!!mask} 
            onChangeText={handleInputChange}
            value={mask}
          />

        { errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <Button
          title="Prosseguir"
          isLoading={isLoading}
          disabled={!(mask.replace(/[^\w]/gi, '').split('').length === 11)} //verify if input is filled
          onPress={confirmFunction}
        />
      </KeyboardAvoidingView>

      <View/>
    </View>
  )
}