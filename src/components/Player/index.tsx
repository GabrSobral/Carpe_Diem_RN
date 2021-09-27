import React from "react";
import { MaterialIcons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'

import { styles }  from './style'
import { theme } from "../../styles/theme";
import { useState } from "react";

export function Player(){
  const [ isStarted, setIsStarted ] = useState(false)

  return(
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={() => setIsStarted(!isStarted)}
      >
        { isStarted ? 
          <MaterialIcons name="play-arrow" size={32} color={theme.colors.white}/> :
          <MaterialIcons name="pause" size={32} color={theme.colors.white}/> 
        }
      </TouchableOpacity>

      <View style={styles.sliderContainer}>
        <Text style={styles.duration}>00:23</Text>
        <View style={styles.slider}/>
        <Text style={styles.duration}>04:16</Text>
      </View>
    </View>
  )
}