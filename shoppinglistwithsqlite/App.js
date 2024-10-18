import { StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Shoppinglist from './Shoppinglist';

export default function App() {

  const initialize = async (db) => {
    try {
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS shoppinglist (id INTEGER PRIMARY KEY NOT NULL, title TEXT, amount TEXT)'
      );
    } catch (error) {
      console.error('Could not open database', error)
    }

  }

  return (
    <SQLite.SQLiteProvider
    databaseName='shoppinglistdb.db'
    onInit={initialize}
    onError={error => console.error('Could not open database', error)}
    >
      <Shoppinglist />
    </SQLite.SQLiteProvider>
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
