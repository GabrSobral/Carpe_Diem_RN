import React, { useEffect, useState } from "react"
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
  const [ isFinished, setIsFinished ] = useState(false)
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
    setIsFinished(true)

    if(isClockStarted) {
      setMessage("Pausado")
      sizeMotion(0, 300)
    } else {
      setMessage("Inspire...")
      sizeMotion(1)
    }

    clearTimeout(timeOutFunction)
  }
  
  useEffect(()=> {
    if(!isClockStarted) { return clearTimeout(timeOutFunction)}
    if(!isFinished) {
      timeOutFunction = setTimeout(() => {
        sizeMotion(1)
        setMessage("Inspire...")
        setIsFinished(true)
      }, seconds)
    } else {
      timeOutFunction = setTimeout(() => {
        sizeMotion(0)
        setMessage("Expire...")
        setIsFinished(false)
      }, seconds)
    }
    return () => clearTimeout(timeOutFunction)
  },[isClockStarted, isFinished])
  
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