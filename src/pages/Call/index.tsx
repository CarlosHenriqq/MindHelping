import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';


const Call = () => {
  return (
    <View style={styles.container}>    
      
        <View>
        <TouchableOpacity style={styles.ContainerImagem}>    
        <Image
          source={require('../../../assets/img/telefone_icon.png')}
          style={styles.imagem}
          resizeMode="contain" // Ajuste conforme necessário
        />
        </TouchableOpacity>
      </View>
      

      <View >
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
  ContainerImagem: {
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  imagem: {
    width: '75%', // Ou qualquer porcentagem que se ajuste ao seu layout
    height: undefined, // Ajusta automaticamente baseado na proporção
   aspectRatio: 1, // Mantém a proporção da imagem, 1:1 para um quadrado
    borderRadius: 150, // Ajuste conforme necessário
    borderWidth: 4,
    borderColor: '#000000',
  },
  texto:{
    fontSize:18,
    margin:10
  }
});
