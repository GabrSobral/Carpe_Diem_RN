import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, useWindowDimensions } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { OptionsButtons } from '../../components/OptionsButtons'
import { ModalComponent } from '../../components/Modal'
import { ProfileHeader } from '../../components/ProfileHeader'

import { styles } from './style'
import { theme } from '../../styles/theme'
import { useUsers } from '../../contexts/UserContext'
import { api } from '../../services/api';

export function Profile(){
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
        <ProfileHeader/>

        <View style={styles.profileContentContainer}>
          <View style={styles.profileContentItem}>
            <Text style={styles.profileContentItemText}>Atividades Realizadas:</Text>

            <Text style={styles.profileContentValueText}>{user?.all_activities_finished}</Text>
          </View>

          <OptionsButtons/>

          <View style={styles.logoutButtonContainer}>
            <RectButton 
              rippleColor={theme.colors.red900}
              style={styles.logoutButton} 
              onPress={() => setIsLogoutModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutText}>Sair</Text>
              <Feather name="log-out" size={32} color={theme.colors.red900}/>
            </RectButton>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}