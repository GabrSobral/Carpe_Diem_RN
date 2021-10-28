import React, { useEffect, useRef, useState, useCallback } from 'react'
import LottieView from 'lottie-react-native'
import { Feather } from '@expo/vector-icons'
import { View, Text, StatusBar, FlatList } from 'react-native'

import background from '../../../../assets/background.json'
import data from './guide.json'

import { styles } from './style'
import { theme } from '../../../styles/theme'
import { RectButton } from 'react-native-gesture-handler'

export function GuidedImagination() {
  const [ currentText, setCurrentText ] = useState(1)
  const [ isPaused, setIsPaused ] = useState(true)
  const list = useRef(null)

  useEffect(() => {
    if(isPaused || (currentText >= data.length - 1)) { return }

    let interval = setInterval(
      () => {
        if(list.current)
          list?.current.scrollToIndex({
            animated: true, 
            index: Number(currentText), 
            viewPosition:0.5
          });
        setCurrentText(prev => prev +1)
      }, data[currentText].time * 1000)

    return () => clearInterval(interval)
  },[data, currentText, isPaused])

  const renderItem = useCallback(({item}: any) => 
    <Text 
      style={[styles.text, String(currentText) === item.id && styles.currentText]}>
      {item.text}
    </Text>
  ,[currentText])
  const keyExtractor = useCallback((item) => item.id, [])

  return(
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <LottieView 
        loop
        autoPlay
        cacheComposition
        resizeMode="cover"
        source={background}
        style={styles.image}
      />

      <View style={{ height: 100 }}/>

      <View style={styles.textContainer}>
        <FlatList
          ref={list}
          data={data}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          maxToRenderPerBatch={4}
          windowSize={4}
        />
      </View>

      <RectButton 
        onPress={() => setIsPaused(prev => !prev)}
        style={[styles.button, 
          { backgroundColor: !isPaused ? theme.colors.red300 : theme.colors.blue400 }]} 
      >
        <Feather 
          name={!isPaused ? "pause" : "play"}
          size={35}
          color={theme.colors.white}
        /> 
      </RectButton>
    </View>
  )
}