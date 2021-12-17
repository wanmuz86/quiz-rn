import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';


export default function Quiz({navigation}) {

    const [questions, setQuestions] = useState(null)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [options, setOptions] = useState([])
    const [message, setMessage] = useState('')
    const [score, setScore] = useState(0)

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=18')
            .then(response => response.json())
            .then(data => {
                setQuestions(data["results"])
                let options = data["results"][questionNumber]["incorrect_answers"]
                options.push(data["results"][questionNumber]["correct_answer"])
                setOptions(shuffle(options))

            });
    }, [])

    const verifyAnswer = (answer) => {
        /// Check if answer is correct or not
        if (answer == questions[questionNumber]["correct_answer"]) {
            setScore(score+1)
            setMessage("Answer is correct")
      
        }
        else {
            setMessage("Answer is incorrect .")
        }
        // Wait for 3 s then only go to the next page

        if (questionNumber == 9){
            navigation.push('Score',{'score':score})
        }
        else {
        setTimeout(() => {
            let options = questions[questionNumber + 1]["incorrect_answers"]
            options.push(questions[questionNumber + 1]["correct_answer"])
            setOptions(shuffle(options))
            setQuestionNumber(questionNumber + 1)
            setMessage("")

        }, 1000)
    }


    }
    return (
        <View style={styles.container}>
            {
                questions ?

                    <View>
                        <Text>{questions[questionNumber]["question"].replace(/&#039;/g,"'")
                        .replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>')}</Text>
                        {
                            options.map(val => {
                                return <TouchableHighlight style={styles.answerBtn}
                                    onPress={() => verifyAnswer(val)}>
                                    <Text style={{ color: 'white' }}>{val.replace(/&#039;/g,"'")
                                    .replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>')}</Text>
                                </TouchableHighlight>
                            })
                        }
                        <Text>{message}</Text>
                        <StatusBar style="auto" />
                    </View>
                    :
                    <View></View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    answerBtn: {
        backgroundColor: 'blue',
        padding: 10,
        textAlign: 'center',
        width: 200,
        margin: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
