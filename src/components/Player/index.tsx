import React, { useEffect, useState } from "react";
import { Audio } from 'expo-av'
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'

import { styles }  from './style'
import { theme } from "../../styles/theme";
import { convertDurationToTimeString } from "../../utils/convertoToTimestring";
import { File } from "../../types/file";

interface PlayerProps {
  file: File;
}

export function Player({ file }: PlayerProps){
  const [ isStarted, setIsStarted ] = useState(false)
  const [ progress, setProgress ] = useState<number>(0)
  const [ sound ] = useState(new Audio.Sound())
  
  useEffect(() => {
      (async () => await sound.unloadAsync())();
      (async () => await sound.loadAsync(
        { uri: file.url }, { isLooping: false, shouldPlay: false }) )()
  },[sound])

  useEffect(() => {
    if(isStarted) {
      (async () => await sound.replayAsync())()
    } else {
      (async () => await sound.pauseAsync())()
    }
  },[isStarted, sound])

  function handleSeek(amount : number){
    sound.setPositionAsync(
      amount, 
      { toleranceMillisAfter: 1, toleranceMillisBefore: 1 })
    .then(() => sound.playAsync())
    
    setProgress(Math.round(amount))
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={() => setIsStarted(!isStarted)}
      >
        { !isStarted ? 
          <MaterialIcons name="play-arrow" size={32} color={theme.colors.white}/> :
          <MaterialIcons name="pause" size={32} color={theme.colors.white}/> 
        }
      </TouchableOpacity>

      <View style={styles.sliderContainer}>
        <Text style={styles.duration}>{convertDurationToTimeString(progress)}</Text>
          <Slider 
            value={progress}
            onValueChange={handleSeek}
            style={{flex: 1}}
            minimumValue={0}
            maximumValue={file.duration}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        <Text style={styles.duration}>
          {convertDurationToTimeString(Math.round(file.duration))}
        </Text>
      </View>
    </View>
  )
}