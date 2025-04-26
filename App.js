import React, {useState, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Iniciar = () => {
  const [dif, setDif] = useState("");
  const onPress = (dif) => setDif(prevDif => dif)

  if (dif != "") {
    return <App dificuldade={dif}></App>; // Renderiza o componente `App` quando o estado `showGame` for verdadeiro
  }
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <TouchableOpacity style={styles.button} onPress={() => onPress("facil")}>
            <Text id="facil">Fácil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPress("medio")}>
            <Text id="medio">Médio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPress("dificil")}>
            <Text id="dificil">Difícil</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const App = ({dificuldade}) => {
  const [voltar, setVoltar] = useState(false);

  const images = [
    { id: 0, source: require('./assets/virada.png'), name: 'zelda1', match: false},
    { id: 1, source: require('./assets/virada.png'), name: 'zelda1', match: false},
    { id: 2, source: require('./assets/virada.png'), name: 'zelda2', match: false},
    { id: 3, source: require('./assets/virada.png'), name: 'zelda2', match: false},
    { id: 4, source: require('./assets/virada.png'), name: 'zelda3', match: false},
    { id: 5, source: require('./assets/virada.png'), name: 'zelda3', match: false},
    { id: 6, source: require('./assets/virada.png'), name: 'zelda4', match: false},
    { id: 7, source: require('./assets/virada.png'), name: 'zelda4', match: false},
  ];

  //const ImagensEmbaralhadas = [images[0], images[0], images[1], images[1], images[2], images[2], images[3], images[3]].sort(() => Math.random() - 0.5); 
  const ImagensEmbaralhadas = useMemo(() => {
    if (dificuldade === 'facil') {
      return images.slice(0, 4).sort(() => Math.random() - 0.5); // Apenas 4 imagens
    } else if (dificuldade === 'medio') {
      return images.slice(0, 6).sort(() => Math.random() - 0.5); // Apenas 6 imagens
    } else if (dificuldade === 'dificil') {
      return images.sort(() => Math.random() - 0.5); // Todas as 8 imagens
    }
  }, [dificuldade]);

  //const [count, setCount] = useState(0);
  //const onPress = () => setCount(prevCount => prevCount + 1);
  
  const sourceVirada = '/assets/?unstable_path=.%2Fassets/virada.png'
  const [firstImage, setFirstImage] = useState(null);
  const onPress = (clickedImage) => {
    if (clickedImage === "voltar") {
      setVoltar(true);
    }
    else if (!firstImage && !clickedImage.match) {
      // Se nenhuma imagem foi clicada antes, armazene a atual
      setFirstImage(clickedImage);
      img = ImagensEmbaralhadas.find(image => image.id === clickedImage.id);
      img.source = { uri: '/assets/?unstable_path=.%2Fassets/' + img.name + '.jpeg' };
    }
    else if (clickedImage.source.uri == sourceVirada) {
      // Se já houver uma imagem armazenada, compare
      if (firstImage.name === clickedImage.name) {
        ImagensEmbaralhadas.find(image => image.id === clickedImage.id).source = { uri: '/assets/?unstable_path=.%2Fassets/' + clickedImage.name + '.jpeg' };
        ImagensEmbaralhadas.filter(image => image.name.includes(firstImage.name))[0].match = true;
        ImagensEmbaralhadas.filter(image => image.name.includes(firstImage.name))[1].match = true;
      } else {
        console.log("As imagens não combinam!");
        ImagensEmbaralhadas.find(image => image.id === firstImage.id).source = { uri: '/assets/?unstable_path=.%2Fassets/virada.png' }
      }
      // Reseta o estado para permitir novas comparações
      setFirstImage(null);
    }
    else if (!clickedImage.match) {
      console.log("Esta imagem ja foi selecionada");
    }
    else {
      setFirstImage(null);
      console.log("Esta imagem ja foi encontrada");
    }
  };

  if (voltar) { //se voltar é verdadeiro então chamar tela iniciar
    return <Iniciar />
  }

  // const [name, setName] = useState("");
  // const onPress = (name) => setName(prevName => name);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.countContainer}>
          <Text>nome: {name}</Text>
        </View> */}

        {ImagensEmbaralhadas.map((image, index) => (
          <View style={{flex: 1, flexDirection: "row" }}>
            <TouchableOpacity key={index} onPress={() => onPress(image)}>
              <Image
                style={styles.img}
                source={image.source}
              />
            </TouchableOpacity>
          </View>
        ))}

        <View>
          <TouchableOpacity style={styles.button} onPress={() => onPress("voltar")}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>

        </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
    width: 100,
    height: 100,
  },
});

export default Iniciar;