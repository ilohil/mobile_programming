import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function Calculator({ navigation }) {

    const [result, setResult] = useState(0);
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [history, setHistory] = useState([]);
  
    const calculate = (sign) => {
  
      const num1 = parseFloat(number1)
      const num2 = parseFloat(number2)
      let result1;
  
      if (sign === '+') {
        result1 = num1 + num2;
        setResult(result1)
      } else {
        result1 = num1 - num2;
        setResult(result1)
      }
  
      saveHistory(sign, result1)
    }
  
    const saveHistory = (sign, result1) => {
  
      const calculation = number1 + sign + number2 + " = " + result1
      setHistory([calculation, ...history])
  
    }
  
    const emptyListComponent = () => {
      return(
        <Text style={{fontSize: 20}}>No data available</Text>
      )
    }
  
    return (
      <View style={styles.container}>
  
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={styles.textStyle}>Result: {result}</Text>
        <TextInput placeholder='0' onChangeText={number1 => setNumber1(number1)} value={number1} keyboardType='numeric' style={styles.input}/>
        <TextInput placeholder='0' onChangeText={number2 => setNumber2(number2)} value={number2} keyboardType='numeric'style={styles.input}/>
        </View>
        
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-around', width: 150, marginTop: 20}}>
        <View style = {{marginRight: 20, width: 35}}>
          <Button title='+' onPress={() => calculate('+')}/>
        </View>
        <View style = {{marginLeft: 20, width:35, marginRight: 20}}>
          <Button title='-' onPress={() => calculate('-')}/>
        </View>
        <View style = {{marginLeft: 20}}>
            <Button title='History' onPress={() => navigation.navigate('History', {history: history})} />
        </View>
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
    textStyle: {
      fontSize: 25
    },
  
  });