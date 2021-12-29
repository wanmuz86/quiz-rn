import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Score({navigation}) {
  const [highScore,setHighScore] = useState(false)


  const storeData = async () => {
    try {
      // First parameter is the "file name"
      // Second parameter is what to save

      // 1) Get the current high score...
      // 2) If the score > current high score
      // 3) Then only save it as a high score
      // let value =await AsyncStorage.getItem('@high_score')
      // let time = await AsyncStorage.getItem('@time')
      /* THe left part value == null && time == null - for the first try, when nobody played the game */
      /* The right part, after || is when somebody already has a high score.. */

    //   if (
    //     (value == null && time == null || 
    //   (navigation.getParam('score') > parseInt(value) && navigation.getParam('duration') < parseFloat(time) ))){
        
    //     let newScore = []
    //     let score = {
    //       "score":navigation.getParam('score'),
    //       "duration":navigation.getParam('duration')
    //     }
    //     newScore.push(score)
      

    //     await AsyncStorage.setItem('@scores', JSON.stringify(newScore))
    //     await AsyncStorage.setItem('@high_score', navigation.getParam('score'))
    //     await AsyncStorage.setItem('@time', navigation.getParam('duration'))
        
      
    //     setHighScore(true)
      
    // }

    let highscores = await AsyncStorage.getItem('@scores')

    // THere is no high score in the database
    console.log(highscores)
  
    if (highscores == null){
      let newScore = []
      let score = {
        "score":navigation.getParam('score'),
        "duration":navigation.getParam('duration')
      }
      newScore.push(score)
    console.log(newScore)
      await AsyncStorage.setItem('@scores', JSON.stringify(newScore))
    }
    else if (JSON.parse(highscores).length < 5){
      let newScore = JSON.parse(highscores)
      
      let score = {
        "score":navigation.getParam('score'),
        "duration":navigation.getParam('duration')
      }
      newScore.push(score) 
      console.log(newScore)
      await AsyncStorage.setItem('@scores', JSON.stringify(newScore))
    }

     
   
      setHighScore(true)
      
    
    
  
    } catch (e) {
      // saving error
    }
  }

  // When the page is loaded..
  useEffect(() => {
    storeData()
  },
  [])
  return (
    <View style={styles.container}>
      {
        highScore ? <Text>Congratulation! You break the high Score</Text> : <View></View>
      }
      <Text>Your score is {navigation.getParam('score')} out of 10</Text>
      <Text>You take {navigation.getParam('duration')} seconds to answer the question</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
