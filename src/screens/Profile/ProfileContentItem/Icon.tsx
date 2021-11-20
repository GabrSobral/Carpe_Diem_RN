import React from 'react'
import { Feather } from '@expo/vector-icons'
import { View } from 'react-native'
import { theme } from '../../../styles/theme'

interface IconProps { icon: string }

export function IconProfile({ icon }: any){
  switch(icon){
    case 'star':
      return <Feather name="star" size={24} color={theme.colors.gray500}/>
    case 'lock':
      return <Feather name="lock" size={24} color={theme.colors.gray500}/>
    case 'answers':
      return <Feather name="list" size={24} color={theme.colors.gray500}/>
    default: return <View/>
  }
}