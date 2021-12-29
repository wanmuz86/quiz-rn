import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HighScore({ navigation }) {
    const [highScore, setHighScore] = useState('')

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@high_score')
            if (value !== null) {
                // value previously stored
                setHighScore(value)
            }
        } catch (e) {
            // error reading value
        }
    }

    // When the page is loaded..
    useEffect(() => {
        getData()
    },
        [])

    return (
        <View style={styles.container}>
            <Text>High Score is {highScore}</Text>
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
