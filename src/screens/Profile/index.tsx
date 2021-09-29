import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { OptionsButtons } from '../../components/OptionsButtons'
import { ModalComponent } from '../../components/Modal'

import { styles } from './style'
import { theme } from '../../styles/theme'
import { useUsers } from '../../contexts/UserContext'
import { useNavigation, CommonActions } from '@react-navigation/native'

export function Profile(){
  const { reset, navigate, dispatch } = useNavigation()
  const [ isLogoutModalVisible, setIsLogoutModalVisible ] = useState(false)
  const { user, Logout } = useUsers()

  return(
    <View style={styles.container}>
      { isLogoutModalVisible &&
        <ModalComponent 
          title="Volte sempre..."
          description="Você tem certeza de que deseja sair do nosso app?"
          isVisible={isLogoutModalVisible}
          dualButtons
          animation="logout"
          confirmFunction={Logout}
          closeModal={() => setIsLogoutModalVisible(false)}
        />
      }

      <Header/>

      <ScrollView>
        <View style={styles.profileHeaderContainer}>
          <View style={styles.imageContainer}>
            
          </View>

          <Text style={styles.userName}>{user?.name}</Text>

          <Text style={styles.registratedAt}>Registrado em: {user?.created_at}</Text>
        </View>

        <View style={styles.profileContentContainer}>
          <View style={styles.profileContentItem}>
            <Text style={styles.profileContentItemText}>
              Atividades Realizadas:
            </Text>

            <Text style={styles.profileContentValueText}>{user?.all_activities_finished}</Text>
          </View>

          <OptionsButtons/>

          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={() => setIsLogoutModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>Sair</Text>
            <Feather name="log-out" size={32} color={theme.colors.red900}/>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  )
}