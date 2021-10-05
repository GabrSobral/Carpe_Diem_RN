import React, { useState, useRef } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { OnboardingItem } from '../../components/OnboardingItem'
import { Paginator } from '../../components/Paginator'
import { NextButton } from '../../components/NextButton'

import slides from '../../slides'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'

export function Onboarding(){
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const { navigate } = useNavigation()
  const slidesRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = () => {
    if(currentIndex < slides.length - 1){
      slidesRef?.current.scrollToIndex({ index: currentIndex + 1});
    } else {
      navigate('QuestionnaireInitial')
    }
  }
  
  return(
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: 
            { contentOffset: { x: scrollX } }}], { useNativeDriver: false })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX}/>

      <NextButton 
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}/>
    </View>
  )
}