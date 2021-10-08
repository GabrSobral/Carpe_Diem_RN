import React from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'

import { styles } from '../style'

interface ContentProps {
  item: {
    id: number;
    title: string;
    button: string;
    description?: string;
    textSingleButton?: string
  };
  closeModal: () => void;
}

export function Content({ item, closeModal }: ContentProps){
  const { width } = useWindowDimensions()

  return(
    <View style={{ flexDirection: 'column', width: width - 69 }}>
      <View style={[styles.titleAndDescriptionContainer, {  }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}adsas</Text>
      </View>
      
      {
        item.button === "single" ? (
          <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.singleButton}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.finalButtonsContainer}>
            <View style={styles.repeatAndNextContainer}>
              <TouchableOpacity 
                activeOpacity={0.7}
                style={styles.button} 
                onPress={() => {closeModal();}}
              >
                <Text style={styles.buttonText}>Repetir exercício</Text>
              </TouchableOpacity>
    
              <TouchableOpacity 
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => {}}
              >
                <Text style={styles.buttonText}>Prosseguir</Text>
              </TouchableOpacity>
            </View>
    
            <TouchableOpacity 
              onPress={closeModal}
              activeOpacity={0.7}
              style={styles.returnToHomeButton}
            >
              <Text style={styles.buttonText}>Retornar para a tela inicial</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}