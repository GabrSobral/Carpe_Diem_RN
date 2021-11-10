import React, { useRef, useState } from 'react'
import { Video } from 'expo-av'
import LottieView from 'lottie-react-native'
import { Feather } from '@expo/vector-icons'
import { View, StatusBar } from 'react-native'

import background from '../../../../assets/background.json'

import { styles } from './style'
import { theme } from '../../../styles/theme'
import { RectButton } from 'react-native-gesture-handler'
import { ProtocolNextModal } from '../ProtocolNextModal'
import { useNavigation } from '@react-navigation/core'

export function GuidedImagination() {
  const { goBack } = useNavigation()
  const video = useRef<Video>(null);
  const [status, setStatus] = useState({} as any);
  const [ isModal1Visible, setIsModal1Visible ] = useState(true)
  const [ isModal2Visible, setIsModal2Visible ] = useState(false)

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
        secondButtonText="Voltar"
        secondButtonFunction={() => {setIsModal2Visible(false); goBack()}}
        textSingleButton="Entendido"
        isVisible={isModal2Visible}
        closeModal={() => {setIsModal2Visible(false);}}
      />
      <StatusBar barStyle="light-content"/>
      <LottieView 
        loop
        autoPlay
        cacheComposition
        resizeMode="cover"
        source={background}
        style={styles.image}
      />

      <View style={{ height: 100 }}/>

      <View style={styles.textContainer}>
        <Video
          style={{ flex: 1, borderRadius: 7, opacity: 0.6 }}
          ref={video}
          useNativeControls={false}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          source={{ 
            uri: 'https://res.cloudinary.com/dmv19qtjb/video/upload/v1636503960/quapeojb7imbnpcudax4.mp4' 
          }}
        />
       
      </View>

      <RectButton 
        onPress={() =>
          video.current && (
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          )
        }
        style={[styles.button, 
          { backgroundColor: status.isPlaying ? theme.colors.red300 : theme.colors.blue400 }]} 
      >
        <Feather 
          name={status.isPlaying ? "pause" : "play"}
          size={35}
          color={theme.colors.white}
        /> 
      </RectButton>
    </View>
  )
}