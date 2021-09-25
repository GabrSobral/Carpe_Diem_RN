import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { View, Text } from 'react-native'
import { SvgUri } from 'react-native-svg'
import ClockSVG from '../../images/clock.svg'

import { styles } from './style'
import { useNavigation } from "@react-navigation/native";

const icons = {
  // clock: <ClockSVG width={32} height={32}/>
}

export function HomeItem(){
  const { navigate } = useNavigation() as any
  return(
    <RectButton style={styles.container} onPress={() => navigate('Clock')}>
      <View style={styles.iconContainer}>
        <SvgUri uri={ClockSVG} width={32} height={32}/>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Respire e se acalme...</Text>
        <Text style={styles.subtitle}>Faça exercícios de respiração para se acalmar.</Text>
      </View>
    </RectButton>
  )
}