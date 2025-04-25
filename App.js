import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  // const [count, setCount] = useState(0);
  // const onPress = () => setCount(prevCount => prevCount + 1);
  const [name, setName] = useState("")
  const onPress = (param) => {setName(param);};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text>nome: {name}</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={() => onPress("Zelda Image")}>
            <Image
              style={styles.img}
              source={
              require('./assets/zelda1.jpeg')
              }
            />
          </TouchableOpacity>
        </View>
        
        </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default App;