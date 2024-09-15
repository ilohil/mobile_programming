import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchExchangerates } from './Api';

export default function App() {

  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState("USD")
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const data = await fetchExchangerates();
        setRates(data.rates);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    handleFetch();
  }, []);


  const handleConvert = () => {
    const rate = rates[currency]
    const result = parseFloat(amount) / rate
    setConvertedAmount(result.toFixed(2))
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.textStyle}>{convertedAmount} €</Text>

      <View style={styles.select}>

        <TextInput style={styles.textStyle} keyboardType='numeric' placeholder='0' value={amount} onChangeText={setAmount}/>

        {Object.keys(rates).length > 0 ? (
              <Picker
                style={styles.picker}
                selectedValue={currency}
                onValueChange={(itemValue) => setCurrency(itemValue)}
              >
                {Object.keys(rates).map(currencyCode => (
                  <Picker.Item key={currencyCode} label={currencyCode} value={currencyCode} />
                ))}
              </Picker>
            ) : (
              <Text style={styles.textStyle}>Loading currencies...</Text>
            )}

      </View>

      <Button title="Convert" onPress={handleConvert}/>

      <StatusBar style='auto' />
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
  textStyle: {
    fontSize: 20
  },
  select: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  picker: {
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
