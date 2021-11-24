import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { OptionsButtons } from '../../components/OptionsButtons'
import { ModalComponent } from '../../components/Modal'
import { ProfileHeader } from '../../components/ProfileHeader'

import { styles } from './style'
import { theme } from '../../styles/theme'
import { useUsers } from '../../contexts/UserContext'
import { ProfileContentItem } from './ProfileContentItem'

export function Profile(){
  const [ isLogoutModalVisible, setIsLogoutModalVisible ] = useState(false)
  const { user, Logout } = useUsers()
  const { navigate } = useNavigation()

  return(
    <View style={styles.container}>
      <ModalComponent 
        title="Volte sempre..."
        description="Você tem certeza de que deseja sair do nosso app?"
        isVisible={isLogoutModalVisible}
        dualButtons
        animation="logout"
        confirmFunction={() => {
          setIsLogoutModalVisible(false)
          Logout()
        }}
        closeModal={() => setIsLogoutModalVisible(false)}
      />

      <Header/>

      <ScrollView>
        <ProfileHeader/>

        <View style={styles.profileContentContainer}>
          <View style={[styles.profileContentItem, { marginTop: 0 }]}>
            <Text style={styles.profileContentItemText}>Atividades Realizadas:</Text>
            <Text style={styles.profileContentValueText}>{user?.all_activities_finished}</Text>
          </View>

          <OptionsButtons/>

          <View style={styles.profileContentItemContainer}>
            <ProfileContentItem route="MyFeedbacks" text={`Marcados como "Gostei"`} icon="star"/>
            <ProfileContentItem route="QuestionnaireAfter" text="Mudar respostas" icon="answers"/>
            <ProfileContentItem route="ChangePassword" text="Mudar senha" icon="lock"/>
          </View>

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