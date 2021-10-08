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
  const [ respirationSize, setRespirationSize ] = useState(0)
  const [ isClockStarted, setIsClockStarted ] = useState(false)
  const [ isFinished, setIsFinished ] = useState(false)
  const [ isFirst, setIsFirst ] = useState(10)
  const [ message, setMessage ] = useState('Começar')

  const sizeValue = useRef(new Animated.Value(0)).current;

  const sizeAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 300] })
  const radiusAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 150] })

  const sizeAnim = {
    width: sizeAnimation, 
    height: sizeAnimation,
    borderRadius: radiusAnimation
  }

  function sizeMotion(value: 0 | 1, duration = 7000){
    Animated.timing(sizeValue, {
      toValue: value,
      duration: duration,
      useNativeDriver: false
    }).start();
  }
  
  function handleStartClock(){
    setIsClockStarted(!isClockStarted)
    isClockStarted ? setIsFirst(0) : setIsFirst(1)
    // setIsFinished(false)
    clearTimeout(timeOutFunction)
  }

  let timeOutFunction : NodeJS.Timeout
  
  useEffect(()=> {
    let insideTimeout = timeOutFunction
    if(isFirst === 1){
      setIsFirst(isFirst + 1)
      setIsFinished(true)
      clearTimeout(insideTimeout)
      setRespirationSize(100)

      sizeMotion(1)
      setMessage("Inspire...")
    }
    if(isFirst === 0){
      setIsFirst(isFirst + 2)
      setIsFinished(true)
      setRespirationSize(0.0001)
      clearTimeout(insideTimeout)

      sizeMotion(0, 300)
      setMessage("Pausado...")
    }
    if(isFinished && isClockStarted){
      insideTimeout = setTimeout(() => {
        setIsFinished(false)
        setRespirationSize(0)
        
        sizeMotion(0)
        setMessage("Expire...")
      }, 7000)
    } else if(!isFinished && isClockStarted){
      insideTimeout = setTimeout(() => {
        setIsFinished(true)
        setRespirationSize(100)

        sizeMotion(1)
        setMessage("Inspire...")
      }, 7000)
    }
    return () => clearTimeout(insideTimeout)

  },[respirationSize, isClockStarted])
  
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
          { !isClockStarted ? 
            <Feather 
              name="play"
              size={35}
              color={theme.colors.white}
            /> 
              : 
            <Feather 
              name="pause"
              size={35}
              color={theme.colors.white}
            /> 
          }
         
        </RectButton>
      </View>
    </View>
  )
}