import React, { useEffect, useState } from "react";
import { Audio } from 'expo-av'
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Alert } from 'react-native'

import { styles }  from './style'
import { theme } from "../../styles/theme";
import { convertDurationToTimeString } from "../../utils/convertoToTimestring";
import { File } from "../../types/file";

interface PlayerProps {
  file: File;
}

export function Player({ file }: PlayerProps){
  const [ isFirstTime, setIsFirstTime ] = useState(true)
  const [ isStarted, setIsStarted ] = useState(false)
  const [ progress, setProgress ] = useState<number>(0)
  const [ sound ] = useState(new Audio.Sound())

  useEffect(() => {
    (async () => {
      try{
        file && await sound.loadAsync({ uri: file.url })
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
      } catch(error) {
        Alert.alert("Erro ao tentar carregar arquivo de áudio")
        console.error(error)
      }
    })();
    
    return () => { (async () => await sound.unloadAsync())() }
  },[sound])

  useEffect(() => {
    if(sound === null){ return }
    if(isStarted) {
      (async () => await sound.playAsync())()
    } else if(sound._loaded){
      (async () => await sound.pauseAsync())()
    }
  },[isStarted])

  function onPlaybackStatusUpdate(playback: any){
    if(sound === null){ return }

    const position = Math.round((playback.positionMillis || 0) / 1000)
    if(position == progress ) { return }
    setProgress(position)
  }

  async function handleSeek(amount : number){
    if(sound === null){ return }
    await sound.setPositionAsync(amount * 1000)
    setProgress(Math.ceil(amount))
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlButton} onPress={() => setIsStarted(!isStarted)}>
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
            maximumTrackTintColor="#ffffff"
          />
        <Text style={styles.duration}>
          {convertDurationToTimeString(Math.round(file.duration))}
        </Text>
      </View>
    </View>
  )
}