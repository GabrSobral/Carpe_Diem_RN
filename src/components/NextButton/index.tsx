import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import Svg, { G, Circle } from 'react-native-svg'
import { Feather } from '@expo/vector-icons';

import { theme } from '../../styles/theme';

import { styles } from './style'

interface NextButtonProps {
  percentage: number;
  scrollTo: () => void;
}

export function NextButton({ percentage, scrollTo }: NextButtonProps){
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  const progressAnimation = useRef(new Animated.Value(0)).current
  const progressRef = useRef(null) as any

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => { animation(percentage) },[percentage])

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100;

      if(progressRef?.current){
        progressRef.current.setNativeProps({
          strokeDashoffset
        }, [percentage])
      }
      return () => {
        progressAnimation.removeAllListeners()
      }
    })
  },[])

  return(
    <View style={styles.container}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
            <Circle 
              stroke={theme.colors.gray100} 
              cx={center} 
              cy={center} 
              r={radius} 
              strokeWidth={strokeWidth}
            />
            
            <Circle 
              ref={progressRef}
              stroke={theme.colors.blue400} 
              cx={center} 
              cy={center} 
              r={radius} 
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
            />
          </G>
        </Svg>

        <RectButton 
          onPress={scrollTo}
          style={styles.button} 
          activeOpacity={0.6}
        >
          <Feather name="arrow-right" size={32} color={theme.colors.white}/>
        </RectButton>
    </View>
  )
}