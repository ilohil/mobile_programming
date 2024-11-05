import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [thingtosay, setThingtosay] = useState("")

  const speak = () => {
    Speech.speak(thingtosay)
  }

  return (
    <View style={styles.container}>
      
      <View>
        <TextInput 
        value={thingtosay}
        placeholder='Write a text you want to hear'
        onChangeText={text => setThingtosay(text)}
        style={styles.textInput}
        />
      </View>

      <Button title='Press to hear text' onPress={speak}/>

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
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 30
  }
});
