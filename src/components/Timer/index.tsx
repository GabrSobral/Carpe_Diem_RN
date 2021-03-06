import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'

interface TimerProps {
  isClockActive: boolean;
}

export function Timer({ isClockActive }: TimerProps){
  const [ timer, setTimer ] = useState<string[]>(["00:","00"])
  const [ seconds, setSeconds ] = useState(0)

  useEffect(()=>{
    let timeout: NodeJS.Timeout
    if(isClockActive){
      timeout = setTimeout(()=> {
        setSeconds(prevState => prevState + 1)
      },1000)
      const timestamp = convertDurationToTimeString(seconds)
      setTimer(timestamp)
      return () => clearTimeout(timeout)
    }
    return () => clearTimeout(timeout)
  },[seconds, isClockActive])

  function convertDurationToTimeString(duration : number){
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60
  
    const timeString = [minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
  
    timeString[1] = `:${timeString[1]}`
  
    return timeString
  }

  return(
    <Text style={styles.timer}>{timer}</Text>
  )
}