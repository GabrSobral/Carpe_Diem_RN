import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import { useUsers } from '../../contexts/UserContext';
import { theme } from '../../styles/theme';

import { styles } from './style'

export function ProgressBar(){
  const { user } = useUsers()
  const [ percentage, setPercentage ] = useState<number>(0)

  useEffect(() => {
    const percentegeCalculated = Math.round(
      ((user?.activities_finished_today || 0) * 100) / (user?.quantity_of_activities || 0))
    setPercentage(percentegeCalculated)
  },[ user?.activities_finished_today, user?.quantity_of_activities ])

  return(
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${percentage}%` }]}/>
        <Text style={[styles.progressBarText]}>
          {user?.activities_finished_today}/{user?.quantity_of_activities} conclúidas
        </Text>
    </View>
  )
}