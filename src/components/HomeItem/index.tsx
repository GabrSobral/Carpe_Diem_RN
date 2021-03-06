import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
// import LottieView from 'lottie-react-native'

// import clockAnimation from '../../../assets/clock.json'
import { styles } from './style'
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";

export function HomeItem(){
  const { navigate } = useNavigation() as any
  return(
    <RectButton 
      style={styles.container} 
      onPress={() => navigate('Clock')}
      rippleColor={theme.colors.blue600}
    >
      <View style={styles.iconContainer}>
        <Feather name="clock" size={34} color={theme.colors.white}/>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Respire e se acalme...</Text>
        <Text style={styles.subtitle}>Faça exercícios de respiração para se acalmar.</Text>
      </View>
    </RectButton>
  )
}