import React, { useEffect, useState, useRef, useCallback } from "react"
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
  const [ isPaused, setIsPaused ] =             useState(false)
  const [ isFinished, setIsFinished ] =         useState(false)
  const [ message, setMessage ] =               useState('Começar')
  const [ timesCompleted, setTimesCompleted ] = useState(0)
  
  const [ isModal1Visible, setIsModal1Visible ] = useState(true)
  const [ isModal2Visible, setIsModal2Visible ] = useState(false)
  const [ isModal3Visible, setIsModal3Visible ] = useState(false)
  const [ isModal4Visible, setIsModal4Visible ] = useState(false)

  const sizeValue = useRef(new Animated.Value(0)).current;
  const sizeAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 300] })
  const radiusAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 150] })

  const seconds = 3 * 1000 // 7 seconds 

  const sizeAnim = {
    width: sizeAnimation, 
    height: sizeAnimation,
    borderRadius: radiusAnimation
  }

  function sizeMotion(value: 0 | 1, duration = seconds){
    Animated.timing(sizeValue, {
      toValue: value,
      duration: duration,
      useNativeDriver: false
    }).start();
  }

  useEffect(() => {
    switch(timesCompleted) {
      case  1 : setTimeout(() => setIsModal2Visible(true), seconds); handlePauseTrue(); break;
      case 1.5: setTimeout(() => setIsModal3Visible(true), seconds); handlePauseTrue(); break;
      case  3 : setIsModal4Visible(true); handleStartClock(); break;
    }
  },[timesCompleted])

  function handlePauseFalse() { setIsPaused(false); }
  function handlePauseTrue()  { setIsPaused(true);  }

  function handleStartClock(){
    setIsClockStarted(prev => !prev)
    setIsFinished(true)

    if(isClockStarted) {
      setMessage("Pausado...")
      sizeMotion(0, 300)
    } else 
      handleChangeRespirationState('Inspire')
  }
  const  handleChangeRespirationState = useCallback((action = "Inspire") => {
    const breathing = action === "Inspire"
    
    sizeMotion(breathing ? 1 : 0)
    setMessage(`${action}...`)
    setIsFinished(breathing)
    setTimesCompleted(prev => prev + 0.5)
  },[])

  useEffect(()=> {
    if(!isClockStarted || isPaused) { return }

    let intervalFunction = setInterval(() => {
      if(!isFinished)
        return handleChangeRespirationState('Inspire')
      else
        return handleChangeRespirationState('Expire')
    }, seconds)

    return () => clearInterval(intervalFunction)
  },[isClockStarted, isFinished, isPaused])

  return(
    <View style={styles.container}>
      <ProtocolNextModal
        title='Encontre uma posição confortável e fique tranquilo(a)!'
        description="(uma cama pode ser o melhor lugar)"
        button="single"
        textSingleButton="Prosseguir"
        isVisible={isModal1Visible}
        closeModal={() => {setIsModal1Visible(false);}}
      />

      <ProtocolNextModal
        title='Respire fundo e estique os pés e os dedos dos pés por alguns segundos'
        button="single"
        textSingleButton="Entendido"
        isVisible={isModal2Visible}
        closeModal={() => {setIsModal2Visible(false); handlePauseFalse()}}
      />

      <ProtocolNextModal
        title='Expire lentamente e liberte a tensão'
        button="single"
        textSingleButton="Entendido"
        isVisible={isModal3Visible}
        closeModal={() => {setIsModal3Visible(false); handlePauseFalse()}}
      />

      <ProtocolNextModal
        title={`Se sente melhor? ${'\n'} Quais serão os próximos passos?`}
        button="two"
        restart
        resetFunction={()=> { setTimesCompleted(0); setIsModal4Visible(false) }}
        isVisible={isModal4Visible}
        closeModal={() => {setIsModal4Visible(false); handlePauseFalse()}}
        nextRoute="MusclesRelaxing"
      />

      <ProtocolHeader/>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{message}</Text>
        
        <View style={{ alignItems: 'center' }}>
          <View style={styles.circularContainer}>
            <Animated.View style={[ styles.circularFill, sizeAnim ]}/>
          </View>
          <Timer isClockActive={(isClockStarted && !isPaused)}/>
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