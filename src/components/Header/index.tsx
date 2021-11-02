import React, { useState } from "react";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";
import { useUsers } from "../../contexts/UserContext";
import { UrgentModal } from "../UrgentModal";

interface HeaderProps {
  canGoBack?: boolean;
}

function HeaderComponent({ canGoBack = false }: HeaderProps){
  const [ isUrgentModalVisible, setIsUrgentModalVisible ] = useState(false)
  const { user } = useUsers()
  const { goBack } = useNavigation()

  return(
    <View style={styles.container}>
      {
        isUrgentModalVisible &&
          <UrgentModal
            isVisible={isUrgentModalVisible}
            closeModal={() => setIsUrgentModalVisible(false)}
          /> 
      }
      
      
      <View style={styles.nameContainer}>
        { canGoBack && (
          <TouchableOpacity 
            style={{ marginRight: 10 }} 
            onPress={() => goBack()}>
            <MaterialIcons name="arrow-back" size={30} color={theme.colors.gray800}/>
          </TouchableOpacity>
        ) }

        <Text style={styles.nameGreeting}>Olá</Text> 
        <Text style={styles.name}>{user?.name && user?.name.split(' ')[0]}</Text>
      </View>
      
      { user?.hasAnswered && (
        <TouchableOpacity style={styles.urgentButton} onPress={() => setIsUrgentModalVisible(true)}>
          <Feather name="alert-circle" size={32} color={theme.colors.white}/>
        </TouchableOpacity>
      ) }

    </View>
  )
}

export const Header = React.memo(HeaderComponent)