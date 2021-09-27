import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { OptionsButtons } from '../../components/OptionsButtons'
import { ModalComponent } from '../../components/Modal'

import { styles } from './style'
import { theme } from '../../styles/theme'

export function Profile(){
  const [ isLogoutModalVisible, setIsLogoutModalVisible ] = useState(false)

  return(
    <View style={styles.container}>
      <ModalComponent 
        title="Volte sempre..."
        description="Você tem certeza de que deseja sair do nosso app?"
        isVisible={isLogoutModalVisible}
        dualButtons 
        closeModal={() => setIsLogoutModalVisible(false)}
      />
      <Header/>

      <ScrollView>
        <View style={styles.profileHeaderContainer}>
          <View style={styles.imageContainer}>
            
          </View>

          <Text style={styles.userName}>
            Gabriel Sobral dos Santos
          </Text>

          <Text style={styles.registratedAt}>Registrado em: 05/03/2018 ás 15:04</Text>
        </View>

        <View style={styles.profileContentContainer}>
          <View style={styles.profileContentItem}>
            <Text style={styles.profileContentItemText}>
              Atividades Realizadas:
            </Text>

            <Text style={styles.profileContentValueText}>12</Text>
          </View>

          <OptionsButtons/>

          <View style={styles.logoutButtonContainer}>
            <RectButton style={styles.logoutButton} onPress={() => setIsLogoutModalVisible(true)}>
              <Text style={styles.logoutText}>Sair</Text>
              <Feather name="log-out" size={32} color={theme.colors.red300}/>
            </RectButton>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}