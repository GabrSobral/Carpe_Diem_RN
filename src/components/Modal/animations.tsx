import React from 'react'
import LottieView from 'lottie-react-native'
import congratsAnimation from '../../../assets/congrats.json'
import trashAnimation from '../../../assets/trash.json'
import logoutAnimation from '../../../assets/logout.json'
import mailAnimation from '../../../assets/mail.json'
import passwordAnimation from '../../../assets/password.json'

import { styles } from './style';

interface ModalAnimationsProps {
  animation: "congrats" | "trash" | 'logout' | 'sendMail' | "password"
}

export function ModalAnimations({ animation }: ModalAnimationsProps){
  switch(animation) {
    case 'congrats':
      return (
      <LottieView
        source={congratsAnimation}
        autoPlay
        loop={false}
        style={styles.animation}
      /> )

    case 'trash':
      return (
      <LottieView
        source={trashAnimation}
        autoPlay
        loop={false}
        style={styles.animation}
      /> )

    case 'logout':
      return (
      <LottieView
        source={logoutAnimation}
        autoPlay
        loop={false}
        style={styles.animation}
      /> )

    case 'sendMail':
      return (
      <LottieView
        source={mailAnimation}
        autoPlay
        loop={true}
        style={styles.animation}
      /> )

    case 'password':
      return (
      <LottieView
        source={passwordAnimation}
        autoPlay
        loop={false}
        style={styles.animation}
      /> )
  }
}