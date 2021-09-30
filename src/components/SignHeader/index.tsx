import React from 'react'
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { styles } from './style'

interface SignHeaderProps{
  title: string;
  button?: "Entrar" | "Cadastrar" | "Voltar"
}

export function SignHeader({ title, button }: SignHeaderProps){
  const { navigate, goBack } = useNavigation()

  function handleNavigation(){
    switch(button){
      case "Cadastrar" : navigate('SignUp'); break;
      case "Entrar" : goBack(); break;
      case "Voltar" : goBack(); break;
    }
  }

  return(
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      { button &&
        <RectButton 
          style={styles.Button}
          onPress={handleNavigation}
        >
          <Text style={styles.titleButton}>
            {button}
          </Text>
        </RectButton>
      }
    </View>
  )
}