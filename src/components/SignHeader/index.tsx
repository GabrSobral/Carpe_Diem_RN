import React from 'react'
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { styles } from './style'

interface SignHeaderProps{
  title: "Entrar" | "Cadastrar";
}

export function SignHeader({ title }: SignHeaderProps){
  const { navigate, goBack } = useNavigation()

  function handleNavigation(){
    switch(title){
      case "Cadastrar": goBack(); break;
      case "Entrar" : navigate('SignUp'); break;
    }
  }

  return(
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <RectButton 
        style={styles.Button}
        onPress={handleNavigation}
      >
        <Text style={styles.titleButton}>
          {title === "Entrar" ? "Cadastrar" : "Entrar"}
        </Text>
      </RectButton>
    </View>
  )
}