import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text, View, ScrollView, StyleSheet } from 'react-native'

import { Player } from '../../../components/Player'
import { ProtocolHeader } from '../../../components/ProtocolHeader'

import { styles } from '../../ActivityDetails/style'
import { File } from '../../../types/file'
import { theme } from '../../../styles/theme'
import fonts from '../../../styles/fonts'
import { RectButton } from 'react-native-gesture-handler'


export function MusclesRelaxing(){
  const { navigate } = useNavigation()

  return(
    <View style={styles.container}>
      <ProtocolHeader/>

      <ScrollView>
        <View style={{ padding: 16, alignItems: 'center' }}>

          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="self-improvement" color={theme.colors.white} size={32}/>
            </View>
            <View style={styles.contentSelectedContainer}>
              <Text style={styles.title}>Descansar e direcionar a mente...</Text>
              <Text style={styles.subtitle}>Vai dar tudo certo, fique tranquilo(a)...</Text>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <Text style={styles.body}>
              Lrea daisudh jhdas as dasdasio daush dasuhd asu hdai sudasd asudh asiuhdas dua shdja oshd 9asujas d iiuas udznga oi wi ohd qngabr iels yashg
            </Text>
          </View>

          <Player file={{} as File}/>

          <RectButton 
            onPress={() => navigate('GuidedImagination') as never}
            style={musclesRelaxingStyle.nextButton}
          >
            <Text style={musclesRelaxingStyle.nextButtonText}>Prosseguir</Text>
          </RectButton>
        </View>
      </ScrollView>
    </View>
  )
}

const musclesRelaxingStyle = StyleSheet.create({
  nextButton: {
    marginTop: 16,
    width: "80%",
    padding: 16,
    backgroundColor: theme.colors.green500,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextButtonText: {
    color: theme.colors.white,
    fontFamily: fonts.heading
  }
})