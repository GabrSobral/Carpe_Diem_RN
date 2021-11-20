import React, { useEffect, useRef, useState } from 'react'
import { Video, AVPlaybackStatus } from 'expo-av'
import LottieView from 'lottie-react-native'
import { Feather } from '@expo/vector-icons'
import { View, StatusBar } from 'react-native'

import background from '../../../../assets/background.json'

import { styles } from './style'
import { theme } from '../../../styles/theme'
import { RectButton } from 'react-native-gesture-handler'
import { ProtocolNextModal } from '../ProtocolNextModal'
import { useNavigation, StackActions } from '@react-navigation/core'

export function GuidedImagination() {
  const { dispatch } = useNavigation()
  const video = useRef<Video>(null);
  const [status, setStatus] = useState({} as AVPlaybackStatus);
  const [ isModal1Visible, setIsModal1Visible ] = useState(true)
  const [ isModal2Visible, setIsModal2Visible ] = useState(false)

  useEffect(() => {
    if(status.isLoaded && status.didJustFinish) 
      setIsModal2Visible(true)
  },[status.isLoaded && status.didJustFinish])

  function reset(){
    video.current?.replayAsync();
    video.current?.pauseAsync();
    setIsModal2Visible(false)
  }

  return(
    <View style={styles.container}>
      <ProtocolNextModal
        title='Estamos quase lá...'
        description="A seguir terá uma meditação guiada, recomendamos fortemente que utilize um fone de ouvido e que se posicione de forma confortável."
        button="single"
        textSingleButton="Entendido"
        isVisible={isModal1Visible}
        closeModal={() => {setIsModal1Visible(false);}}
      />

      <ProtocolNextModal
        title='Parabéns!'
        description={`Você finalizou todas as atividades! ${'\n'} Quais serão os próximos passos?`}
        button="two"
        restart
        resetFunction={reset}
        secondButtonText="Voltar ao último passo"
        secondButtonFunction={() => {
          setIsModal2Visible(false); 
          dispatch(StackActions.replace("ClockProtocol"))}}
        textSingleButton="Entendido"
        isVisible={isModal2Visible}
        closeModal={() => {setIsModal2Visible(false);}}
      />
      <StatusBar barStyle="light-content"/>
      <LottieView 
        cacheComposition
        resizeMode="cover"
        source={background}
        style={styles.image}
      />

      <View style={{ height: 100 }}/>

      <View style={styles.textContainer}>
        <Video
          style={styles.video}
          ref={video}
          useNativeControls={false}
          resizeMode="contain"
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => setStatus(() => status)}
          source={{ 
            uri: 'https://res.cloudinary.com/dmv19qtjb/video/upload/v1636503960/quapeojb7imbnpcudax4.mp4' 
          }}
        />
       
      </View>

      <RectButton 
        onPress={() =>
          video.current && (
            (status.isLoaded && status.isPlaying) ? video.current.pauseAsync() : video.current.playAsync()
          )
        }
        style={[styles.button, 
          { backgroundColor: (status.isLoaded && status.isPlaying) ? theme.colors.red300 : theme.colors.blue400 }]} 
      >
        <Feather 
          name={(status.isLoaded && status.isPlaying) ? "pause" : "play"}
          size={35}
          color={theme.colors.white}
        /> 
      </RectButton>
    </View>
  )
}