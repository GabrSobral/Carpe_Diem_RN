import React from 'react'
import { View, Animated, useWindowDimensions } from 'react-native'

import { styles } from './style'

interface PaginatorProps {
  data: any,
  scrollX: Animated.Value
}

export function Paginator({ data, scrollX }: PaginatorProps){
  const { width } = useWindowDimensions();

  return(
    <View style={{ flexDirection: 'row' , height: 64}}>
      {data.map((item: any, index: number) => {
        const inputRange = [(index -1)  * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10,20,10],
          extrapolate: 'clamp'
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        })

        return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={index}/>
      })}
    </View>
  )
}