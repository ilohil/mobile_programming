import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { app } from './FirebaseConfig';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';

const database = getDatabase(app)

export default function App() {

  const [product, setProduct] = useState({
    title: "",
    amount: "",
  })

  const [products, setProducts] = useState([])

  useEffect(() => {
    const itemsRef = ref(database, "/items")

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const keys = Object.keys(data)

        const datakeys = Object.values(data).map((obj, index) => { 
          return {...obj, key: keys[index] } 
        });
  
        setProducts(datakeys);
      }
      else {
        setProducts([])
      }
    })
  }, [])

  const handleSave = () => {
    push(ref(database, 'items/'), product)
  }

  const deleteItem = (key) => {
    remove(ref(database, `items/${key}`));
  }

  return (
    <View style={styles.container}>
          
          <TextInput
            value={product.title}
            style={{fontSize: 20}}
            placeholder='Product title'
            onChangeText={text => setProduct({...product, title: text})}
          />
    
          <TextInput
            value={product.amount}
            style={{fontSize: 20}}
            placeholder='Amount'
            onChangeText={text => setProduct({...product, amount: text})}
          />
    
          <Button title='Save product' onPress={handleSave}/>
    
          <FlatList 
          data={products}
          renderItem={({item}) => 
          <View style={{flexDirection: "row", margin: 10}}>
          <Text style={{fontSize: 18, marginRight: 5}}>{item.title}</Text>
          <Text style={{fontSize: 18, marginRight: 5}}>{item.amount}</Text>
          <Text style={{fontSize: 18, color: 'blue' }} onPress={() => deleteItem(item.key)}>delete</Text>
          </View>
          }
          />
    
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
    marginTop: 50
  },
});