import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Call = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.Seta}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
          <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSetaHeader}
          />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.ContainerImagem}>
          <Image
            source={require('../../../assets/img/telefone_icon.png')}
            style={styles.imagem}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.texto}> CLIQUE PARA LIGAR AO CVV 188</Text>
      </View>
    </View>
  );
};

export default Call;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Seta: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'flex-start',
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagemSetaHeader: {
    width: 20,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5, // Espaçamento entre a seta e o texto
    transform: [{ scaleX: -1 }],
  },
  textoVoltar: {
    fontSize: 16,
  },
  ContainerImagem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: '75%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#000000',
    padding: 20,
  },
  texto: {
    fontSize: 18,
    margin: 10,
  },
});
