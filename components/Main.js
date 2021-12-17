import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Main({navigation}) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://st4.depositphotos.com/38197074/40253/v/450/depositphotos_402532106-stock-illustration-computer-science-vector-icon-logo.jpg',
                }}
            />
            <TouchableHighlight style={styles.startBtn} onPress={()=> navigation.push('Quiz')}>
                <Text style={{color:'white'}}>Start Game</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.hiBtn}>
                <Text>High Score</Text>
            </TouchableHighlight>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    startBtn: {
        backgroundColor: 'blue',
        padding:10,
        textAlign:'center',
        width: 200,
        margin: 10,
    },
    hiBtn: {
        backgroundColor: 'yellow',
        padding:10,
        textAlign:'center',
        width: 200,
        margin: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
});
