import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import LottieView from 'lottie-react-native'

import { styles } from './style'

interface OnboardingItemProps{
  item: {
    id: string,
    title: string,
    description: string,
    image: any
  }
}

export function OnboardingItem({ item }: OnboardingItemProps){
  const { width } = useWindowDimensions()
  
  return(
    <View style={[styles.container, { width }]}>
      <LottieView 
        source={item.image} 
        style={[styles.image, { width }]}
        autoPlay
        loop={false}
        autoSize
      />
    
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}