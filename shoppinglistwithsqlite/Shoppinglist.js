import { useEffect, useState } from "react";
import { View, TextInput, Text, Button, FlatList, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

export default function Shoppinglist() {

    const [product, setProduct] = useState({
        title: "",
        amount: "",
      });

    const [products, setProducts] = useState([]);

    const db = useSQLiteContext();

    const handleSave = async () => {
        try { 
            await db.runAsync('INSERT INTO shoppinglist (title, amount) VALUES (?, ?)', product.title, product.amount);
            await updateList();
        } catch (error) {
            console.error('Could not add item', error)
        }

    };

    const updateList = async () => {
        try {
            const list = await db.getAllAsync('SELECT * from shoppinglist');
            setProducts(list);
          } catch (error) {
            console.error('Could not get items', error);
          }
    };

    const deleteItem = async (id) => {
        try {
          await db.runAsync('DELETE FROM shoppinglist WHERE id=?', id);
          await updateList();
        }
        catch (error) {
          console.error('Could not delete item', error);
        }
      };

    useEffect(() => { updateList() }, []);

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
          <Text style={{fontSize: 18, color: 'blue' }} onPress={() => deleteItem(item.id)}>bought</Text>
          </View>
          }
          />
    
          <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  