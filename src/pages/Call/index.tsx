import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Alert,
  Animated,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ImmediatePhoneCall from 'react-native-immediate-phone-call';
import ImmersiveMode from 'react-native-immersive-mode';
import { File } from 'lucide-react-native';

const Call = () => {
  const [legenda , setLegenda] = useState(false)
  const navigation = useNavigation();

  // 1) valor animado para controlar a posição Y da legenda (deslizando)
  const slideAnim = useRef(new Animated.Value(100)).current;  // Começa fora da tela, abaixo

  // 2) animação para deslizar a legenda quando a tela for carregada
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,  // Move para a posição normal
      duration: 500,  // Duração da animação
      useNativeDriver: true,
    }).start();
    setLegenda(true)
  }, []);  // Apenas quando o componente é montado

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#00BBF4');
      StatusBar.setBarStyle('light-content');
      ImmersiveMode.setBarMode('Bottom');
      return () => ImmersiveMode.setBarMode('Normal');
      setLegenda(false)
    }, [])
  );

  async function ligar188() {
    if (Platform.OS === 'android') {
      const ok = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE
      );
      if (ok !== PermissionsAndroid.RESULTS.GRANTED) {
        return Alert.alert('Permissão negada');
      }
    }
    ImmediatePhoneCall.immediatePhoneCall('188');
  }

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
        <Text style={{ fontSize: 20 }}>NÃO ESTÁ SE SENTINDO BEM</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>E PRECISA CONVERSAR?</Text>
        <Text style={{ fontSize: 25, top: 35, alignSelf: 'center' }}>LIGUE PARA O CVV</Text>

        <View style={styles.ContainerImagem}>
          <Image
            source={require('../../../assets/img/cvv.png')}
            style={styles.imagem}
            resizeMode="cover"
          />
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.containerCall} onPress={ligar188}>
          <Image
            source={require('../../../assets/img/phone.png')}
            style={styles.imgPhone}
          />
          <Text style={styles.texto}> APERTE AQUI PARA LIGAR</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: 'black', bottom:40 }}>Ligações disponíveis 24h</Text>

      {/* Ícone com legenda animada com slide */}
      <View style={styles.iconWrapper}>
        <File color="gray" size={46} />
        <Animated.Text
          style={[
            styles.tooltip,
            {
              transform: [{ translateY: slideAnim }], // Aplica a animação de deslizar
            },
          ]}
        >
          Relatório
        </Animated.Text>
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
    marginRight: 5,
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
    width: '100%',
    height: '60%',
    padding: 20,
  },
  containerCall: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00BBF4',
    backgroundColor: '#00BBF4',
    width: 293,
    height: 34,
    flexDirection: 'row',
    paddingLeft: 10,
    bottom: 40,
  },
  imgPhone: {
    width: 30,
    height: 30,
  },
  texto: {
    fontSize: 18,
    color: 'white',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
  },
  tooltip: {
    marginTop: 8,
    fontSize: 14,
    color: 'gray',
  },
});
