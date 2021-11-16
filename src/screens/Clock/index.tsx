import React, { useCallback, useEffect, useState } from "react"
import { Feather } from '@expo/vector-icons'
import { View, Text, Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Header } from "../../components/Header"
import { styles } from './style'
import { theme } from "../../styles/theme"
import { Timer } from "../../components/Timer"
import { useRef } from "react"

export function Clock(){
  const [ isClockStarted, setIsClockStarted ] = useState(false)
  const isFinished = useRef(false)
  const [ message, setMessage ] = useState('Começar')
  
  const sizeValue = useRef(new Animated.Value(0)).current;
  const sizeAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 300] })
  const radiusAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 150] })

  const sizeAnim = {
    width: sizeAnimation, 
    height: sizeAnimation,
    borderRadius: radiusAnimation
  }
  
  let timeOutFunction : NodeJS.Timeout
  const seconds = 7 * 1000 // 7 seconds

  function sizeMotion(value: 0 | 1, duration = seconds){
    Animated.timing(sizeValue, {
      toValue: value,
      duration: duration,
      useNativeDriver: false
    }).start();
  }
  
  function handleStartClock(){
    setIsClockStarted(prev => !prev)
    isFinished.current = true

    if(isClockStarted) {
      setMessage("Pausado...")
      sizeMotion(0, 300)
    } else 
      handleChangeRespirationState('Inspire')
  }
  
  const handleChangeRespirationState = useCallback((action = "Inspire") => {
    const breathing = action === "Inspire"
    
    sizeMotion(breathing ? 1 : 0)
    setMessage(`${action} lentamente...`)
    isFinished.current = breathing
  },[isFinished.current])
  
  useEffect(()=> {
    if(!isClockStarted) { return }
    timeOutFunction = setInterval(() => {
      if(!isFinished.current)
        handleChangeRespirationState('Inspire')
      else
        handleChangeRespirationState('Expire')
    }, seconds)

    return () => clearInterval(timeOutFunction)
  },[isClockStarted, isFinished.current])
  
  return(
    <View style={styles.container}>
      <Header canGoBack/>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{message}</Text>
        
        <View style={{ alignItems: 'center' }}>
          <View style={styles.circularContainer}>
            <Animated.View style={[ styles.circularFill, sizeAnim ]}/>
          </View>
          <Timer isClockActive={isClockStarted}/>
        </View>

        <RectButton 
          style={[styles.button, 
            isClockStarted ? 
              { backgroundColor: theme.colors.red300 } : 
              { backgroundColor: theme.colors.blue300 }
          ]} 
          onPress={handleStartClock}
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