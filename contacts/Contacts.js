import { useState } from "react";
import { View, Button, Text, FlatList, StyleSheet } from "react-native";
import * as Contact from 'expo-contacts';

export default function Contacts() {

    const [contacts, setContacts] = useState([]);

    const getContacts = async () => {

        const { status } = await Contact.requestPermissionsAsync();

        if (status === 'granted') {
            const { data } = await Contact.getContactsAsync({
                fields: [Contact.Fields.PhoneNumbers]
            });

            if (data.length > 0) {
                setContacts(data);
            }
        }

    }

    const checkNumber = (item) => {

        if (item.phoneNumbers.length > 0) {
            return item.phoneNumbers[0].number
        } else {
            return "no number available"
        }

    }

    return (
        <View  style={styles.container}>
            <FlatList
            data={contacts}
            renderItem={({item}) => 
            <Text>{item.name} {checkNumber(item)}</Text>}
            />

            <View style={styles.button}>
                <Button title="Get contacts" onPress={getContacts}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
    },
    button: {
        marginTop: 600
    },
  });
  