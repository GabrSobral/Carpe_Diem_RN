import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Text, Animated } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { ActivitiesProps } from '../../types/activity'
import { styles } from '../ActivityItem/style'
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivitiesIcons } from "../ActivitiesIcons";

interface ActivityItemProps extends RectButtonProps{
  item: ActivitiesProps;
}

export function ActivityItemSwipeable({ item, ...rest }: ActivityItemProps){
  const { navigate } = useNavigation() as any

  return(
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View style={{ paddingBottom: 8 }}>
            <RectButton 
              style={styles.buttonRemove} 
              onPress={() => {navigate("ActivityDetailsFeedback", { activity: item })}}>

              <Feather name="alert-circle" size={32} color={theme.colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >

      <RectButton style={styles.container} rippleColor={theme.colors.blue600} {...rest} >
        <View style={styles.iconContainer}>
          <ActivitiesIcons category={item.category.name}/>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
            <View style={{ marginLeft: 5 }}>
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
    </Swipeable>
  )
}