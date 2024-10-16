import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Perfil = () => {
  const navigation = useNavigation();
  const [feeling, setFeeling] = useState('');

  useFocusEffect(
    React.useCallback(() => {
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
      

      // Limpeza opcional (se necessário)
      return () => {
        setFeeling(''); // Limpa o sentimento se você quiser redefinir ao sair
      };
    }, [])
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.Seta}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
          <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSetaHeader}
          />
          <Text style={styles.textoVoltar}>Voltar</Text>
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
};

export default Perfil;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 'auto',
  },
  Seta: {
    backgroundColor: '#A7BED3',
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
    marginRight: 5,
    marginLeft: 10,
    transform: [{ scaleX: -1 }],
  },
  textoVoltar: {
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 30,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    backgroundColor: '#A7BED3',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#3A4E48',
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
    borderTopRightRadius: 20,
  },
  nameEmailContainer: {
    marginLeft: 15,
  },
  nome: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#000000',
  },
  email: {
    fontSize: 16,
    color: '#000000',
    marginTop: 5,
    fontStyle: 'italic',
  },
  feeling: {
    fontSize: 14,
    color: '#000000',
    marginTop: 8,
  },
  containerPerfil: {
    backgroundColor: '#ffffff',
    marginTop: -10,
    paddingTop: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    overflow: 'hidden',
    zIndex: 0,
  },
  textPerfil: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    borderColor: 'black',
    paddingBottom: 5,
    marginStart: 5,
  },
  infoPerfil: {
    padding: 15,
    flexDirection: 'row',
    marginTop: 5,
  },
  textInfoPerfil: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagemSeta: {
    width: 10,
    height: 20,
    marginLeft: 'auto',
  },
  containerSettings: {
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
});
