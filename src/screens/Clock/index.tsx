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
  const radiusValue = useRef(new Animated.Value(0)).current;

  const sizeAnimation = sizeValue.interpolate({ inputRange: [0, 1], outputRange: [0, 300] })
  const radiusAnimation = radiusValue.interpolate({ inputRange: [0, 1], outputRange: [0, 150] })

  function sizeMotionGrown(){
    Animated.timing(sizeValue, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: false
    }).start();
    Animated.timing(radiusValue, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: false
    }).start();
  }
  function sizeMotionDown(){
    Animated.timing(sizeValue, {
      toValue: 0,
      duration: 7000,
      useNativeDriver: false
    }).start();
    Animated.timing(radiusValue, {
      toValue: 0,
      duration: 7000,
      useNativeDriver: false
    }).start();
  }
  function stopMotion(){
    Animated.timing(sizeValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
    Animated.timing(radiusValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }
  
  let timeOutFunction : NodeJS.Timeout
  
  function handleStartClock(){
    setIsClockStarted(!isClockStarted)
    isClockStarted ? setIsFirst(0) : setIsFirst(1)
    // setIsFinished(false)
    clearTimeout(timeOutFunction)
  }
  
  useEffect(()=> {
    let insideTimeout = timeOutFunction
    if(isFirst === 1){
      setIsFirst(isFirst + 1)
      setIsFinished(true)
      clearTimeout(insideTimeout)
      setRespirationSize(100)

      sizeMotionGrown()
      setMessage("Inspire...")
    }
    if(isFirst === 0){
      setIsFirst(isFirst + 2)
      setIsFinished(true)
      setRespirationSize(0.0001)
      clearTimeout(insideTimeout)

      stopMotion()
      setMessage("Pausado...")
    }
    if(isFinished && isClockStarted){
      insideTimeout = setTimeout(() => {
        setIsFinished(false)
        setRespirationSize(0)
        
        sizeMotionDown()
        setMessage("Expire...")
      }, 7000)
    } else if(!isFinished && isClockStarted){
      insideTimeout = setTimeout(() => {
        setIsFinished(true)
        setRespirationSize(100)

        sizeMotionGrown()
        setMessage("Inspire...")
      }, 7000)
    }
    return () => clearTimeout(insideTimeout)

  },[respirationSize, isClockStarted])

  const sizeAnim = {
    width: sizeAnimation, 
    height: sizeAnimation,
    borderRadius: radiusAnimation
  }

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