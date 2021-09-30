import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { View, Text } from 'react-native'
import { SvgUri } from 'react-native-svg'

import { ActivitiesProps } from '../../types/activity'
import { styles } from './style'
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";

interface ActivityItemProps extends RectButtonProps{
  item: ActivitiesProps;
}

export function ActivityItem({ item, ...rest }: ActivityItemProps){
  const { navigate } = useNavigation() as any

  return(
    <RectButton style={styles.container} rippleColor={theme.colors.blue600} {...rest} >
      <View style={styles.iconContainer}>

      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.description}</Text>
      </View>
    </RectButton>
  )
}