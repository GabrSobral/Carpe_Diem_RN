import React, { useState, useEffect } from "react";
import LottieView from 'lottie-react-native'
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useUsers } from "../../contexts/UserContext";
import activityAnimation from '../../../assets/activity.json'
import { styles } from '../QuantityOfActivitiesModal/style'
import fonts from "../../styles/fonts";
import { InputContact } from "./InputContact";
import { loadUser } from "../../utils/handleStorage";
import { theme } from "../../styles/theme";

interface QuantityOfActivitiesModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export function ContactModal({ isVisible, closeModal }: QuantityOfActivitiesModalProps){
  const [ mask, setMask ] = useState<string>('')
  const [ isFilled, setIsFilled ] = useState<boolean>(false)
  
  const { handleUpdate } = useUsers()

  useEffect(() => {
    (async () => {
      const userData = await loadUser()
      if(userData !== undefined && userData.emergency_number) {
        let value = userData.emergency_number.substring(2)

        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")

        setMask(value)
      }
    })()
  },[])

  function handleInputChange(value: string){
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")

    setMask(value)
    return value
  }

  async function confirmFunction(){
    const numberWithoutSpecialCharacters = `55${mask.replace(/[^\w]/gi, '')}`
    await handleUpdate({ emergency_number: numberWithoutSpecialCharacters})
  }

  return(
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >

      <View style={styles.container}>
       <KeyboardAvoidingView behavior="padding">
        <View style={styles.popup}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Feather name="x" size={32} color={theme.colors.text}/>
          </TouchableOpacity>

          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <LottieView
              source={activityAnimation}
              autoPlay
              loop={false}
              style={{ backgroundColor: 'transparent', width: 150, height: 150 }}
            />
            <Text style={styles.title}>Confiança é tudo...</Text>
            <Text style={styles.description}>
              Salve um número de telefone de alguém de sua confiança, para mandarmos uma mensagem via
              <Text style={{ fontFamily: fonts.heading }}> WhatsApp</Text> para alertá-lo, caso o protocolo de crises seja acionado
            </Text>

            <InputContact 
              isFilled={!!mask} 
              onChangeText={handleInputChange}
              value={mask}
            />

            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.contactbutton,!(mask.replace(/[^\w]/gi, '').split('').length === 11) && styles.disabled]}
              disabled={!(mask.replace(/[^\w]/gi, '').split('').length === 11)} //verify if input is filled
              onPress={() => {
                confirmFunction && confirmFunction()
                closeModal();
              }}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
       </KeyboardAvoidingView>
      </View>

    </Modal>
  )
}