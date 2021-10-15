import React, { useEffect, useState, useRef } from "react"
import { Feather } from '@expo/vector-icons'
import { View, Text, Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { ProtocolHeader } from "../../../components/ProtocolHeader"
import { Timer } from "../../../components/Timer"
import { ProtocolNextModal } from "../ProtocolNextModal"

import { theme } from "../../../styles/theme"
import { styles } from '../../Clock/style'

export function ClockProtocol(){
  const [ isClockStarted, setIsClockStarted ] = useState(false)
  const [ isPaused, setIsPaused ] = useState(false)
  const [ isFinished, setIsFinished ] = useState(false)
  const [ message, setMessage ] = useState('Começar')
  const [ timesCompleted, setTimesCompleted ] = useState(0)
  
  const [ isModal1Visible, setIsModal1Visible ] = useState(true)
  const [ isModal2Visible, setIsModal2Visible ] = useState(false)
  const [ isModal3Visible, setIsModal3Visible ] = useState(false)
  const [ isModal4Visible, setIsModal4Visible ] = useState(false)

  const sizeValue = useRef(new Animated.Value(0)).current;
  const sizeAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 300] })
  const radiusAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 150] })

  const sizeAnim = {
    width: sizeAnimation, 
    height: sizeAnimation,
    borderRadius: radiusAnimation
  }

  let timeOutFunction : NodeJS.Timeout
  const seconds = 3 * 1000 // 7 seconds

  function sizeMotion(value: 0 | 1, duration = seconds){
    Animated.timing(sizeValue, {
      toValue: value,
      duration: duration,
      useNativeDriver: false
    }).start();
  }

  useEffect(() => {
    switch(timesCompleted){
      case  1 : setIsModal2Visible(true); handleStartClock(); break;
      case 1.5: setIsModal3Visible(true); handleStartClock(); break;
      case  3 : setIsModal4Visible(true); handleStartClock(); break;
    }

  },[timesCompleted])

  function resetExercise() {
    setTimesCompleted(0)
    setIsModal4Visible(false)
  }

  function handleStartClock(){
    setIsClockStarted(prev => !prev)
    setIsFinished(true)

    if(isClockStarted) {
      setMessage("Pausado...")
      sizeMotion(0, 300)
    } else {
      setMessage("Inspire...")
      sizeMotion(1)
    }

    clearTimeout(timeOutFunction)
  }

  useEffect(()=> {
    if(!isClockStarted) { return clearTimeout(timeOutFunction) }

    if(!isFinished) {
      timeOutFunction = setTimeout(() => {
        sizeMotion(1)
        setMessage("Inspire...")
        setIsFinished(true)
      }, seconds)
    } else {
      timeOutFunction = setTimeout(() => {
        sizeMotion(0)
        setTimesCompleted(prev => prev + 0.5)
        setMessage("Expire...")
        setIsFinished(false)
      }, seconds)
    }
    return () => clearTimeout(timeOutFunction)
  },[isClockStarted, isFinished])

  return(
    <View style={styles.container}>
      <ProtocolNextModal
        title='Encontre uma posição confortável e fique tranquilo(a)!'
        description="(uma cama pode ser o melhor lugar)"
        button="single"
        textSingleButton="Prosseguir"
        isVisible={isModal1Visible}
        closeModal={() => {setIsModal1Visible(false); setIsPaused(false)}}
      />

      <ProtocolNextModal
        title='Respire fundo e estique os pés e os dedos dos pés por alguns segundos'
        button="single"
        textSingleButton="Entendido"
        isVisible={isModal2Visible}
        closeModal={() => {setIsModal2Visible(false); setIsPaused(false)}}
      />

      <ProtocolNextModal
        title='Expire lentamente e liberte a tensão'
        button="single"
        textSingleButton="Entendido"
        isVisible={isModal3Visible}
        closeModal={() => {setIsModal3Visible(false); setIsPaused(false)}}
      />

      <ProtocolNextModal
        title={`Se sente melhor? ${'\n'} Quais serão os próximos passos?`}
        button="finish"
        isVisible={isModal4Visible}
        resetFunction={resetExercise}
        closeModal={() => {setIsModal4Visible(false); setIsPaused(false)}}
      />

      <ProtocolHeader/>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{message}</Text>
        
        <View style={{ alignItems: 'center' }}>
          <View style={styles.circularContainer}>
            <Animated.View style={[ styles.circularFill, sizeAnim ]}/>
          </View>
          <Timer isClockActive={isClockStarted}/>
        </View>

        <RectButton 
          onPress={handleStartClock}
          style={[styles.button, 
            { backgroundColor: isClockStarted ? theme.colors.red300 : theme.colors.blue300 }]} 
        >
          <Feather 
            name={isClockStarted ? "pause" : "play"}
            size={35}
            color={theme.colors.white}
          /> 
        </RectButton>
      </View>
    </View>
  )
}