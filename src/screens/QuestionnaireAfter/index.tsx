import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { RadioButton } from '../../components/RadioButton'
import { useUsers } from '../../contexts/UserContext'
import { api } from '../../services/api'
import { theme } from '../../styles/theme'
import { Question } from '../../types/question'

import { styles } from './style'

interface QuestionsAnsAnswers {
  question: Question;
  answer: number | null;
}

export function QuestionnaireAfter(){
  const [ questions, setQuestions ] = useState<QuestionsAnsAnswers[]>([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isFilled, setIsFilled ] = useState(false)

  const { goBack } = useNavigation()

  const { user } = useUsers()

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/question/list')
      const questionsAnsAnswers: QuestionsAnsAnswers[] = []
        
      const answers = await api.get('/answer/my-list')

      data.forEach((item: Question) => {
        let exists = false
        answers.data.forEach((answer:any) => {
          if(String(item.id) === String(answer.question)){
            exists = true
            questionsAnsAnswers.push({
              question: item, answer: Number(answer.answer) || 0
            })
          }
        })
        if(!exists){
          questionsAnsAnswers.push({
            question: item, answer: null
          })
        }
      })   
      setQuestions(questionsAnsAnswers)
    })();
  }, [])

  function handleSet(item: QuestionsAnsAnswers, value: number) {
    setQuestions(prev => {
      return prev.map(prevItem => {
        if(prevItem.question.id === item.question.id) {
          prevItem.answer = value;
        }
        return prevItem
      })
    })
  }

  async function AnswerQuestionnaire(){
    setIsLoading(true) 
    const dataFormatted = questions.map(item => ({
      question: item.question.id,
      answer: item.answer
    }))

    try {
      await api.post('/answer/new', dataFormatted)
      goBack();
    } catch(error) {
      setErrorMessage(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { 
    const filled: any[] = [];
    questions.forEach(item => {
      filled.push(item.answer)
    })

    if(filled.indexOf(null) === -1 && filled.length !== 0) {
      setIsFilled(true)
    }  
  },[questions])

  return (
    <View style={styles.container}>
      <Header canGoBack={user?.hasAnswered}/>

      <ScrollView style={{ padding: 16 }}>
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.title}>Revise e selecione suas {'\n'}respostas novamente</Text>


          {questions.length === 0 && 
            <ActivityIndicator 
              size={56} 
              color={theme.colors.blue300} 
              style={{ marginTop: 16 }}
            />
          }
        
          { questions.map((item, index) => (
            <View style={styles.questionContainer} key={item.question.id}>
              <View style={styles.questionTextContainer}>
                <Text style={styles.questionText}>{item.question.body}</Text>
              </View>

              <View style={styles.inputsContainer}>
                <RadioButton value={0} onPress={() => handleSet(item, 0)} selected={item.answer === 0 ? true: false}/>
                <RadioButton value={1} onPress={() => handleSet(item, 1)} selected={item.answer === 1 ? true: false}/>
                <RadioButton value={2} onPress={() => handleSet(item, 2)} selected={item.answer === 2 ? true: false}/>
                <RadioButton value={3} onPress={() => handleSet(item, 3)} selected={item.answer === 3 ? true: false}/>
                <RadioButton value={4} onPress={() => handleSet(item, 4)} selected={item.answer === 4 ? true: false}/>
                <RadioButton value={5} onPress={() => handleSet(item, 5)} selected={item.answer === 5 ? true: false}/>
              </View>
            </View>
          )) }

          <Text style={styles.errorMessage}>{errorMessage}</Text>

          <Button
            title="Confirmar"
            isLoading={isLoading}
            disabled={!isFilled}
            onPress={AnswerQuestionnaire}
          />
        </View>
      </ScrollView>
      
    </View>
  )
}