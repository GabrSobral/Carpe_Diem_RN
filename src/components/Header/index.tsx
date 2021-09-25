import React from "react";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";

interface HeaderProps {
  canGoBack?: boolean;
}

export function Header({ canGoBack = false }: HeaderProps){
  const { goBack } = useNavigation()
  return(
    <View style={styles.container}>
      { canGoBack && (
        <TouchableOpacity 
          style={{ marginRight: 10 }} 
          onPress={() => goBack()}>
          <MaterialIcons name="arrow-back" size={30} color={theme.colors.gray800}/>
        </TouchableOpacity>
      ) }

      <View style={styles.nameContainer}>
        <Text style={styles.nameGreeting}>Olá</Text> 
        <Text style={styles.name}>Gabriel</Text>
      </View>
    </View>
  )
}