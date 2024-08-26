import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {

  const [result, setResult] = useState("Guess a number between 1-100")
  const [tries, setTries] = useState(1)
  const [number, setNumber] = useState(Math.floor(Math.random()*100)+1)
  const [guess, setGuess] = useState(0)

  const checkGuess = () => {

    const guessNumeric = parseInt(guess)

    if (number < guessNumeric) {
      setResult("Your guess " + guess + " is too high")
      setTries(tries + 1)
    } else if (number > guessNumeric) {
      setResult("Your guess " + guess + " is too low")
      setTries(tries + 1)
    } else {
      Alert.alert("Message", "You guessed the number in " + tries + " guesses")
      setTries(1)
      setNumber(Math.floor(Math.random()*100) +1)
      setResult("Guess a number between 1-100")
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'column', alignItems:'center'}}>
      <Text style={{fontSize: 20}}>{result}</Text>
      <TextInput keyboardType='numeric' style={{borderColor: 'gray', borderWidth: 1, width: 50, margin: 15,}} onChangeText={guess => setGuess(guess)}/>
      <Button title='Make guess' onPress={checkGuess}/>
      </View>
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
