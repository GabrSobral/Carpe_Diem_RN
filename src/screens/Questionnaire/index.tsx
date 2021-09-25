import React, { useState } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { RadioButton } from '../../components/RadioButton'

import { styles } from './style'

export function Questionnaire(){
  const [ isLoading, setIsLoading ] = useState(false)

  const data = [
    {
      id: 1,
      body: "Você gosta de praticar esportes para se sentir bem?"
    },
    {
      id: 2,
      body: "Você gosta de praticar esportes para se sentir bem?"
    },
    {
      id: 3,
      body: "Você gosta de praticar esportes para se sentir bem?"
    },
    {
      id: 4,
      body: "Você gosta de praticar esportes para se sentir bem?"
    },
    {
      id: 5,
      body: "Você gosta de praticar esportes para se sentir bem?"
    }
  ]

  return (
    <View style={styles.container}>
      <Header/>

      <ScrollView style={{ padding: 16 }}>
        <View style={{ paddingBottom: 30 }}>
        <Text style={styles.title}>Permita-nos conhecê-lo melhor</Text>
        
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={(item: any) => (
            <View style={styles.questionContainer}>
              <View style={styles.questionTextContainer}>
                <Text style={styles.questionText}>{item.body}</Text>
              </View>

              <View style={styles.inputsContainer}>
                <RadioButton value={item.index}/>
                <RadioButton value={item.index} selected/>
                <RadioButton value={item.index}/>
                <RadioButton value={item.index}/>
                <RadioButton value={item.index}/>
                <RadioButton value={item.index}/>
              </View>
            </View>
          )}
        
        />
        

        <Button
          title="Confirmar"
          isLoading={isLoading}
          disabled={true}

        />
        </View>
      </ScrollView>
      
    </View>
  )
}