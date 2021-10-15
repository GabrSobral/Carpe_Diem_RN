import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  useWindowDimensions, 
  TextInput, 
  Platform, 
  Image, 
  ActivityIndicator 
} from 'react-native'
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';

import { useUsers } from '../../contexts/UserContext'

import { theme } from '../../styles/theme'
import { styles } from './style'
import { api } from '../../services/api';
import { RectButton } from 'react-native-gesture-handler';

export function ProfileHeader(){
  const { width } = useWindowDimensions()
  const { user, handleUpdate } = useUsers()

  const [ isEditEnabled, setIsEditEnabled ] = useState(false)
  const [ createdAtFormatted, setCreatedATFormatted ] = useState('')
  const [ newName, setNewName ] = useState(user?.name)
  const [ preview, setPreview ] = useState(user?.photo)
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    const userCreatedAtDate = new Date(String(user?.created_at))
    const day = userCreatedAtDate.getDay()
    const month = userCreatedAtDate.getMonth()
    const year = userCreatedAtDate.getFullYear()
    const hour = userCreatedAtDate.getHours()
    const minutes = userCreatedAtDate.getMinutes()
    
    const date = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
    const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

    setCreatedATFormatted(`${date} às ${time}`)
  }, []);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });

    if (!result.cancelled) {
      setPreview(result.uri)
    }
  };
  async function handleSaveChanges(){
    setIsLoading(true)
    await api.patch('/users', { name: newName })
    await handleUpdate({ name: newName })
    await handleUpdate({ photo: preview });
    setIsLoading(false)
    setIsEditEnabled(false)
  }

  return(
    <View style={styles.profileHeaderContainer}>
      <TouchableOpacity 
        style={[
          styles.editButton, 
          isEditEnabled && { elevation: 10, backgroundColor: theme.colors.blue400 }
        ]} 
        onPress={() => setIsEditEnabled(prev => !prev)}>
        <Feather name="edit" size={24} color={theme.colors.white}/>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <View style={{ position: 'relative', overflow: 'hidden', borderRadius: 60}}>
        { isEditEnabled ? 
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <View style={styles.opacityBackgroundImage}>
              <Feather name="camera" size={24} color={theme.colors.white}/>
            </View>
            <Image source={{ uri: preview }} style={styles.image} />
          </TouchableOpacity>
          : (user?.photo ?
            <Image source={{ uri: user?.photo }} style={styles.image} />
            :
            <Entypo name="user" size={70} color={theme.colors.white}/>)
          }
        </View>
        { (isEditEnabled && preview) &&
          <TouchableOpacity style={styles.removeImageButton} onPress={() => setPreview(undefined)}>
            <Feather name="x" size={16} color={theme.colors.red300}/>
          </TouchableOpacity>
        }
      </View>

      <Text style={styles.userName}>
        {!isEditEnabled ? 
          user?.name 
          : 
          <View style={styles.inputNameContainer}>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              style={[styles.inputName, { width: width - 170 }]}
              maxLength={45}
            />
            <RectButton 
              style={[styles.saveNameButton,(!newName && !isLoading) && { opacity: 0.5 }]} 
              onPress={handleSaveChanges}
              enabled={(!!newName && !isLoading)}
            >
              { isLoading ?
                <ActivityIndicator size={24} color={theme.colors.white}/>
                :
                <Feather name="save" size={24} color={theme.colors.white}/>
              }
            </RectButton>
          </View>
        }
      </Text>

      <Text style={styles.registratedAt}>Registrado em: {createdAtFormatted}</Text>
    </View>
  )
}