import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function History({route}) {

    const {history} = route.params;
  
    const emptyListComponent = () => {
      return(
        <Text style={{fontSize: 20}}>No data available</Text>
      )
    }
  
    return (
      <View style={styles.container}>
  
        <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={styles.textStyle}>History:</Text>
        <FlatList
        ListEmptyComponent={emptyListComponent}
        data={history}
        renderItem={({item}) =>
        <Text style={styles.textStyle}>{item}</Text>
        }/>
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