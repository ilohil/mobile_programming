import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { fetchRecipes } from './Search';
import RecipeList from './RecipeList';

export default function App() {

  const [keyword, setKeyword] = useState("")
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFetch = () => {
    setLoading(true)
    fetchRecipes(keyword)

    .then(data => setRecipes(data.meals))
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.textStyle}
      placeholder='Type keyword here...'
      value={keyword}
      onChangeText={text => setKeyword(text)}
      />
      <Button title='Find' onPress={handleFetch}/>

      {loading && <ActivityIndicator size='large' />}
      {console.log(recipes)}

      <RecipeList recipes={recipes}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20

  },
});
