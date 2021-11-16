import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';

import { useUsers } from '../../contexts/UserContext';
import { theme } from '../../styles/theme';

import { styles } from './style'

export function CircularProgressBar(){
  const { user } = useUsers()
  const [ percentage, setPercentage ] = useState<number>(0)

  useEffect(() => {
    const percentegeCalculated = Math.round(
      ((user?.activities_finished_today || 0) * 100) / (user?.quantity_of_activities || 0))
    setPercentage(percentegeCalculated)
  },[ user?.activities_finished_today, user?.quantity_of_activities ])

  return(
    <View style={styles.progressBarContainer}>
      <CircularProgress 
        value={percentage || 0}
        radius={100}
        maxValue={100}
        textColor={theme.colors.text}
        fontSize={40}
        valueSuffix={'%'}
        activeStrokeWidth={7}
        activeStrokeColor={theme.colors.green300}
        inActiveStrokeWidth={4}
        inActiveStrokeColor={theme.colors.green300}
        inActiveStrokeOpacity={0.5}
      />
    </View>
  )
}