import React from 'react';
import LottieView from 'lottie-react-native';
import trophyAnim from '../../../assets/trophy.json'
import { Text, View, StatusBar, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import { styles } from './style'
import { useNavigation } from '@react-navigation/core';

export function Congrats() {
  const { navigate } = useNavigation() as any

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <View/>

      <View style={styles.contentContainer}>
      <Text style={styles.title}>Você foi muito bem!!!</Text>
        <LottieView
          source={trophyAnim}
          autoPlay
          loop={false}
          style={styles.animation}
        />

        <Text style={styles.description}>
          Ebaaa! Você conseguiu vencer uma crise de ansiedade, saber disso é tão confortante...
          {'\n'}Continue assim que você chegará longe.
          {'\n'}Lembre-se de que no final dará tudo certo.
        </Text>
      </View>

      <RectButton style={styles.close} onPress={() => navigate("BottomTabs")}>
        <Text style={styles.closeText}>Voltar à tela principal</Text>
      </RectButton>
    </View>
  );
}


