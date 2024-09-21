import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [address, setAddress] = useState("")
  const [addressInfo, setAddressInfo] = useState([])
  const [location, setLocation] = useState(null)
  const [apikey, setApikey] = useState("YOUR API KEY")

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('No permission to get location')
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    if (!location) {
      return (
        <View style={styles.container}>
          <Text>Loading map...</Text>
          <StatusBar style="auto" />
        </View>
      );
    }

    const handleFetch = () => {
      fetch(`https://geocode.maps.co/search?q=${address}&api_key=${apikey}`)
      .then(response => {
        if(!response.ok)
          throw new Error("Error in fetch:" + response.statusText)

        return response.json()
      })
      .then(data => setAddressInfo(data))
      .catch(err => console.error(err))
    }
 
  return (
    <View style={styles.container}>

    <MapView
      style={{flex:6, width: '100%', height: '100%' }} 
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      }} 
    >
      {addressInfo.length > 0 &&
          addressInfo.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon),
              }}
              title={item.display_name}
            />
          ))}
    </MapView>

      <View style={{flex:1, width: '100%'}}>
      <TextInput style={{fontSize: 15, alignSelf: 'center', margin: 10}} 
      placeholder='Type address here...'
      onChangeText={text => setAddress(text)}
      value={address}/>
      <Button title='Search' onPress={handleFetch}/>
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
