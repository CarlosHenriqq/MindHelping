import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Perfil = () => {

  const navigation = useNavigation()



  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#9381FF');
    }, [])
  );
  const [feeling, setFeeling] = useState('');
  useEffect(() => {
    const getFeeling = async () => {
      try {
        const storedFeeling = await AsyncStorage.getItem('@selectedFeeling');
        if (storedFeeling !== null) {
          setFeeling(storedFeeling);
        }
      } catch (e) {
        console.log("Erro ao ler o sentimento: ", e);
      }
    };

    getFeeling();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.Seta}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
      <Image
        source={require('../../../assets/img/seta.png')}
        style={styles.imagemSetaHeader}
        
      />
      </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../../assets/img/perfil.png')}
            style={styles.perfil}
          />
        </View>
        <View style={styles.nameEmailContainer}>
          <Text style={styles.nome}>Carlos Henrique</Text>
          <Text style={styles.email}>carloshenriquelrs@gmail.com</Text>
          <Text style={styles.feeling}>Hoje estou me sentindo: {feeling}</Text>
        </View>
      </View>
      <View style={styles.containerPerfil}>
        <Text style={styles.textPerfil}>PERFIL</Text>
        <View style={styles.infoPerfil}>
          <Text style={styles.textInfoPerfil}>Configurações do usuário</Text>
          <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSeta}
          />
           </View>
          <View style={styles.infoPerfil}>
            <Text style={styles.textInfoPerfil}>Outras configurações do usuário</Text>
            <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSeta}
          />
        </View>
      </View>
      <View style={styles.containerSettings}>
        <Text style={styles.textPerfil}>CONFIGURAÇÕES</Text>
        <View style={styles.infoPerfil}>
          <Text style={styles.textInfoPerfil}>Ativar Notificações</Text>
          <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSeta}
          />
           </View>
          <View style={styles.infoPerfil}>
            <Text style={styles.textInfoPerfil}>Modo Daltônico</Text>
            <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSeta}
          />
        </View>
      </View>

    </View>
  );

}

export default Perfil;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
   backgroundColor:'#ffffff',
    borderTopLeftRadius: 30, // Arredonda o canto superior esquerdo
    borderTopRightRadius: 30, // Arredonda o canto superior direito
    height:'auto'
  
  },
  Seta:{
    backgroundColor:'#9381FF'
    
  },
  imagemSetaHeader:{
      width: 20,
      height: 30,
      marginTop:10,
      marginBottom:10,
      marginRight: 'auto',
      marginLeft:10,
      transform: [{ scaleX: -1 }],
    
  },

  profileContainer: {
    flexDirection: 'row',  // Mantém a imagem e o texto em linha
    alignItems: 'center',  // Alinha verticalmente o conteúdo
   
    paddingStart: 30,
    paddingBottom:20,
    borderBottomWidth:0.2,
    backgroundColor:'#9381FF'
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#fffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  perfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopRightRadius:20,
    
  },
  nameEmailContainer: {
    marginLeft: 15,  // Espaço entre a imagem e o texto
  },
  nome: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color:'#000000'
  },
  email: {
    fontSize: 16,
    color: '#000000',
    marginTop: 5,
    fontStyle: 'italic'
  },
  feeling: {  // Novo estilo para o sentimento
    fontSize: 14,
    color: '#000000',
    marginTop: 8,

  },
  containerPerfil: {
    backgroundColor: '#ffffff',
    marginTop: -10, // Continua empurrando a parte branca para cima
    paddingTop: 30,
    paddingHorizontal: 20, // Remove o padding lateral
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%', // Garante que ocupe toda a largura
    overflow: 'hidden', // Garante que o arredondamento seja aplicado corretamente
    zIndex: 0,
},

  textPerfil: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    borderColor: 'black',
    paddingBottom: 5,
    marginStart: 5
  },

  infoPerfil: {
    padding: 15,
    flexDirection: 'row',
   
    marginTop:5,
    
  },
  textInfoPerfil: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  imagemSeta: {
    width: 10,
    height: 20,
    marginLeft: 'auto'
  },
  containerSettings:{
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor:'#ffffff'
    
  }
});
