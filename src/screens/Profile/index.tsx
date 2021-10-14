import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Platform, TouchableOpacity, Image, TextInput } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { OptionsButtons } from '../../components/OptionsButtons'
import { ModalComponent } from '../../components/Modal'

import { styles } from './style'
import { theme } from '../../styles/theme'
import { useUsers } from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'

export function Profile(){
  const [ isLogoutModalVisible, setIsLogoutModalVisible ] = useState(false)
  const [ isEditEnabled, setIsEditEnabled ] = useState(false)
  const { user, Logout, handleUpdate } = useUsers()
  const [ newName, setNewName ] = useState(user?.name)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    console.log("banana")
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      await handleUpdate({ photo: result.uri });
    }
  };

  return(
    <View style={styles.container}>
      { isLogoutModalVisible &&
        <ModalComponent 
          title="Volte sempre..."
          description="Você tem certeza de que deseja sair do nosso app?"
          isVisible={isLogoutModalVisible}
          dualButtons
          animation="logout"
          confirmFunction={Logout}
          closeModal={() => setIsLogoutModalVisible(false)}
        />
      }

      <Header/>

      <ScrollView>
        <View style={styles.profileHeaderContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditEnabled(prev => !prev)}>
            <Feather name="edit" size={24} color={theme.colors.white}/>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={{ flex: 1, width: 120, height: 120, alignItems: 'center', justifyContent: 'center' }} onPress={pickImage}>
              { !user?.photo ? 
                <Image source={{ uri: user?.photo }} style={styles.image} />
                :
                <MaterialIcons name="person" size={52} color={theme.colors.white}/>
              }
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>
            {!isEditEnabled ? 
              user?.name 
              : 
              <View style={styles.inputNameContainer}>
                <TextInput
                  value={newName}
                />
              </View>
            }
          </Text>

          <Text style={styles.registratedAt}>Registrado em: {user?.created_at}</Text>
        </View>

        <View style={styles.profileContentContainer}>
          <View style={styles.profileContentItem}>
            <Text style={styles.profileContentItemText}>
              Atividades Realizadas:
            </Text>

            <Text style={styles.profileContentValueText}>{user?.all_activities_finished}</Text>
          </View>

          <OptionsButtons/>

          <View style={styles.logoutButtonContainer}>
            <RectButton 
              rippleColor={theme.colors.red900}
              style={styles.logoutButton} 
              onPress={() => setIsLogoutModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutText}>Sair</Text>
              <Feather name="log-out" size={32} color={theme.colors.red900}/>
            </RectButton>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}