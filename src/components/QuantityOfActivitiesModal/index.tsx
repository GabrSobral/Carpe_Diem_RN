import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { useUsers } from "../../contexts/UserContext";
import { api } from "../../services/api";

import { styles } from './style';

interface QuantityOfActivitiesModalProps {
  isVisible: boolean;
  closeModal: () => void;
  initialValue: number | undefined;
}

export function QuantityOfActivitiesModal({ 
  isVisible, 
  closeModal,
  initialValue
}: QuantityOfActivitiesModalProps){
  const [ selectedValue, setSelectedValue ] = useState<number>(initialValue)
  
  const { handleUpdate } = useUsers()
  const { goBack } = useNavigation()

  async function confirmFunction(){
    await api.patch('/users', { quantity_of_activities: selectedValue })

    // handleUpdateQuantityOfActivities(selectedValue)
    await handleUpdate({ quantity_of_activities: selectedValue })
    closeModal()
  }

  return(
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.title}>Olá...</Text>
          <Text style={styles.description}>
            Selecione a quantidade de atividades diárias que você deseja 
            receber, a mudança será aplicada apenas amanhã.
          </Text>

          <View style={styles.quantityContainer}>
              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.button, selectedValue === 3 && styles.selected, {marginRight: 16}]} 
                onPress={() => setSelectedValue(3)}
              >
                <Text style={[styles.buttonTextQuantity, selectedValue === 3 && styles.selected]}>3</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.button, selectedValue === 4 && styles.selected, {marginRight: 16}]} 
                onPress={() => setSelectedValue(4)}
              >
                <Text style={[styles.buttonTextQuantity, selectedValue === 4 && styles.selected]}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.button, selectedValue === 5 && styles.selected]} 
                onPress={() => setSelectedValue(5)}
              >
                <Text style={[styles.buttonTextQuantity, selectedValue === 5 && styles.selected]}>5</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.dualButtonsContainer}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.button, styles.deny]} 
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.button, styles.accept, !selectedValue && styles.disabled]}
              disabled={!selectedValue}
              onPress={() => {
                confirmFunction && confirmFunction()
                closeModal();
              }}
            >
              <Text style={styles.buttonText}>sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}