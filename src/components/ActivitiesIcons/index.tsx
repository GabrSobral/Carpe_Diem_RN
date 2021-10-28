import React from 'react'
import { Text } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { theme } from '../../styles/theme'

interface ActivitiesIconsProps {
  category: string
}

export function ActivitiesIcons({ category }: ActivitiesIconsProps){
  switch(category) {
    case 'Meditação':
      return <MaterialIcons name="self-improvement" size={32} color={theme.colors.white}/>

    case 'Musica':
      return <MaterialIcons name="headset" size={32} color={theme.colors.white}/>
    
    case 'Alimentação':
      return <MaterialIcons name="restaurant" size={32} color={theme.colors.white}/>
    
    case 'Respiracao':
      return <Feather name="wind" size={32} color={theme.colors.white}/>

    case 'Esporte':
      return <MaterialIcons name="fitness-center" size={32} color={theme.colors.white}/>

    case 'Leitura':
      return <MaterialIcons name="auto-stories" size={32} color={theme.colors.white}/>

    default: return <Text>{category}</Text>
  }
}