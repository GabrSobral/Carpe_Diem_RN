import React from "react";
import { MaterialIcons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'

import { styles }  from './style'
import { theme } from "../../styles/theme";

export function Player(){
  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlButton}>
        <MaterialIcons name="play-arrow" size={32} color={theme.colors.white}/>
      </TouchableOpacity>
    </View>
  )
}