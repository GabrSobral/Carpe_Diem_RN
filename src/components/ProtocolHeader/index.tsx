import React from "react";
import { View, Text } from 'react-native'
import { styles } from "../Header/style";

export function ProtocolHeader(){
  return(
    <View style={styles.container}>      
      <View style={styles.nameContainer}>
        <Text style={styles.name}>Muita calma nessa hora...</Text>
      </View>
    </View>
  )
}