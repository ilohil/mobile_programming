import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {

  const [result, setResult] = useState(0);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  const calculate = (sign) => {

    const num1 = parseFloat(number1)
    const num2 = parseFloat(number2)

    if (sign === '+') {
      setResult(num1 + num2);
    } else {
      setResult(num1 - num2);
    }

  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'column', alignItems: 'center'}}>
      <Text style={{fontSize: 25}}>Result: {result}</Text>
      <TextInput placeholder='0' onChangeText={number1 => setNumber1(number1)} value={number1} keyboardType='numeric' style={styles.input}/>
      <TextInput placeholder='0' onChangeText={number2 => setNumber2(number2)} value={number2} keyboardType='numeric'style={styles.input}/>
      </View>
      
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-around', width: 100, marginTop: 20}}>
        <Button title='+' onPress={() => calculate('+')}/>
        <Button title='-' onPress={() => calculate('-')}/>
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
  input: {
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5
  },

});
