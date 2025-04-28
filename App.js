import React, {useState, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Iniciar = () => {
  const [dif, setDif] = useState("");
  const onPress = (dif) => setDif(prevDif => dif)

  if (dif != "") {
    return <App dificuldade={dif}></App>;
  }
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containerInicial}>
        <View>
          <Text style={styles.titulo}>Jogo da Memória</Text>
        </View>

        <View style={styles.containerDif}>
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
    { id: 0, source: require('./assets/virada.png'), name: 'anya', match: false},
    { id: 1, source: require('./assets/virada.png'), name: 'anya', match: false},
    { id: 2, source: require('./assets/virada.png'), name: 'ford', match: false},
    { id: 3, source: require('./assets/virada.png'), name: 'ford', match: false},
    { id: 4, source: require('./assets/virada.png'), name: 'yor', match: false},
    { id: 5, source: require('./assets/virada.png'), name: 'yor', match: false},
    { id: 6, source: require('./assets/virada.png'), name: 'dog', match: false},
    { id: 7, source: require('./assets/virada.png'), name: 'dog', match: false},
    { id: 8, source: require('./assets/virada.png'), name: 'informante', match: false},
    { id: 9, source: require('./assets/virada.png'), name: 'informante', match: false},
    { id: 10, source: require('./assets/virada.png'), name: 'damian', match: false},
    { id: 11, source: require('./assets/virada.png'), name: 'damian', match: false},
    { id: 12, source: require('./assets/virada.png'), name: 'brother', match: false},
    { id: 13, source: require('./assets/virada.png'), name: 'brother', match: false},
    { id: 14, source: require('./assets/virada.png'), name: 'anya2', match: false},
    { id: 15, source: require('./assets/virada.png'), name: 'anya2', match: false},
    { id: 16, source: require('./assets/virada.png'), name: 'fiona', match: false},
    { id: 17, source: require('./assets/virada.png'), name: 'fiona', match: false},
    { id: 18, source: require('./assets/virada.png'), name: 'sylvia', match: false},
    { id: 19, source: require('./assets/virada.png'), name: 'sylvia', match: false},
    // { id: 20, source: require('./assets/virada.png'), name: 'family', match: false},
    // { id: 21, source: require('./assets/virada.png'), name: 'family', match: false}
  ];

  const ImagensEmbaralhadas = useMemo(() => {
    if (dificuldade === 'facil') {
      return images.slice(0, 12).sort(() => Math.random() - 0.5);
    } else if (dificuldade === 'medio') {
      return images.slice(0, 16).sort(() => Math.random() - 0.5);
    } else if (dificuldade === 'dificil') {
      return images.sort(() => Math.random() - 0.5);
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
      setFirstImage(clickedImage);
      img = ImagensEmbaralhadas.find(image => image.id === clickedImage.id);
      img.source = { uri: '/assets/?unstable_path=.%2Fassets/' + img.name + '.png' };
    }
    else if (clickedImage.source.uri == sourceVirada) {
      if (firstImage.name === clickedImage.name) {
        ImagensEmbaralhadas.find(image => image.id === clickedImage.id).source = { uri: '/assets/?unstable_path=.%2Fassets/' + clickedImage.name + '.png' };
        ImagensEmbaralhadas.filter(image => image.name.includes(firstImage.name))[0].match = true;
        ImagensEmbaralhadas.filter(image => image.name.includes(firstImage.name))[1].match = true;
      } else {
        console.log("As imagens não combinam!");
        ImagensEmbaralhadas.find(image => image.id === firstImage.id).source = { uri: '/assets/?unstable_path=.%2Fassets/virada.png' }
      }
      setFirstImage(null);
    }
    else if (!clickedImage.match) {
      console.log("Esta imagem ja foi selecionada");
    }
    else {
      console.log("Esta imagem ja foi encontrada");
    }
  };

  if (voltar) { //se voltar é verdadeiro então chama tela iniciar
    return <Iniciar />
  }

  // const [name, setName] = useState("");
  // const onPress = (name) => setName(prevName => name);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containerJogo}>
        {/* <View style={styles.countContainer}>
          <Text>nome: {name}</Text>
        </View> */}
        <View style={styles.containerImagens}>
          {ImagensEmbaralhadas.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => onPress(image)}>
              <Image
                style={styles.img}
                source={image.source}
              />
            </TouchableOpacity>
          ))}
        </View>

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
  containerInicial: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerDif: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "20%",
    marginTop: 100,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerJogo: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerImagens: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap", // Permite quebrar linha
    justifyContent: "flex-start", // Alinha as imagens no início
    gap: 10, // Espaçamento uniforme entre as imagens
    width: "60%", // Usa toda a largura disponível
    padding: 10, // Adiciona um espaçamento interno
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  img: {
    margin: 10,
    width: 89,
    height: 144.5,
    resizeMode: "cover",
  },
});

export default Iniciar;