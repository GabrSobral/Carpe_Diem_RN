import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { View, Text } from 'react-native'
import { SvgUri } from 'react-native-svg'

import { ActivitiesProps } from '../../types/activity'
import { styles } from './style'
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";
import { MaterialIcons } from "@expo/vector-icons";

interface ActivityItemProps extends RectButtonProps{
  item: ActivitiesProps;
}

export function ActivityItem({ item, ...rest }: ActivityItemProps){
  const { navigate } = useNavigation() as any

  console.log(item)

  return(
    <RectButton style={styles.container} rippleColor={theme.colors.blue600} {...rest} >
      <View style={styles.iconContainer}>

      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <View>
            { (item && item.feedback.feedback === true) &&
              <MaterialIcons name="thumb-up" color={theme.colors.green100} size={16}/>
            }
            { (item && item.feedback.feedback === false) &&
              <MaterialIcons name="thumb-down" color={theme.colors.red300} size={16}/>
            }
          </View>
        </View>
        <Text style={styles.subtitle}>{item.description}</Text>
      </View>

      
    </RectButton>
  )
}