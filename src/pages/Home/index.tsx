import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#e6e6e6');
    }, [])
  );

  const [feelings] = useState([
    { text: "FELIZ", image: require('../../../assets/img/slide/feliz.png') },
    { text: "TRISTE", image: require('../../../assets/img/slide/triste.png') },
    { text: "COM RAIVA", image: require('../../../assets/img/slide/raiva.png') },
    { text: "ANSIOSO", image: require('../../../assets/img/slide/ansioso.png') },
    { text: "COM TEDIO", image: require('../../../assets/img/slide/tedio.png') },
    { text: "NÃO SEI DIZER", image: require('../../../assets/img/slide/naoseidizer.png') },
  ]);

  const [selectedFeeling, setSelectedFeeling] = useState();
  const navigation = useNavigation();

  const handlePress = (feeling) => {
    setSelectedFeeling(feeling);
  };

  const handleContinue = async () => {
    if (selectedFeeling) {
      try {
        await AsyncStorage.setItem('@selectedFeeling', selectedFeeling);
        console.log(`Sentimento selecionado: ${selectedFeeling}`);
        navigation.navigate('TabNavigation');
      } catch (e) {
        console.log("Erro ao salvar o sentimento: ", e);
      }
    } else {
      console.log("Nenhum sentimento selecionado.");
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.feeling}>
        <View style={styles.containerUser}>
          <View style={styles.textContainer}>
            <Text style={styles.userText}>Oi Carlos,</Text>
            <Text style={styles.textFeeling}>Como você está se sentindo?</Text>
          </View>
          <Image source={require('../../../assets/img/perfil.png')} style={styles.imgUser} />
        </View>
      </View>

      <Swiper
        loop={true}
        autoplay={true}
        autoplayTimeout={5}
        style={{height:200}}
        showsPagination={false}
      >
        {feelings.map((item, index) => (
          <View key={index} style={styles.slide}>
            <TouchableOpacity onPress={() => handlePress(item.text)}>
              <Image source={item.image} style={styles.img} />
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>

      <View style={styles.nextConsulta}>
        <Text style={styles.textConsulta}>Sua próxima consulta: </Text>
        <View style={styles.cardConsulta}>
          <Text style={styles.nameProf}>Dra. Alessandra</Text>
          <Text>Psicóloga</Text>
          <View style={styles.dadosPsi}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/img/icons/email.png')}
                style={styles.emailImg}
              />
            </TouchableOpacity>
            <Text style={styles.contatoProf}>alessandra.psi@gmail.com</Text>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/img/icons/telefone.png')}
                style={styles.emailImg}
              />
            </TouchableOpacity>
            <Text style={styles.contatoProf}>+55 18 99756 - 2102</Text>
          </View>
          <View style={styles.dadoConsulta}>
            <Text style={styles.dateConsulta}>Data</Text>
            <Text style={styles.dateConsulta}>Horário</Text>
          </View>
          <View style={styles.dadosConsulta}>
            <Text>15/10/2024</Text>
            <Text>16:00h</Text>
          </View>
          <View>
            <Text style={styles.dateConsulta}>Endereço</Text>
          </View>
          <View>
            <Text style={styles.dadosLocConsulta}>Lorem ipsum dolor sit quaerat minus, Birigui - SP </Text>
            <View style={styles.maps}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/img/icons/maps.png')}
                  style={styles.mapsImg}
                />
              </TouchableOpacity>
              <Text style={{ fontWeight: 'normal' }}>Abrir através do Google Maps</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerRelax}>
        <Text style={styles.textRelax}>Que tal relaxar?</Text>
        <View style={styles.grid}>
          <View style={styles.card}>
            <TouchableOpacity>
            <Text style={styles.cardText}>Que tal tentar meditar?</Text>
            <Image
              source={require('../../../assets/img/icons/meditacao.png')}
              style={styles.relaxImg}/>
              </TouchableOpacity>
          </View>
          <View style={styles.card}>
          <TouchableOpacity>
            <Text style={styles.cardText}>Ou conversar com alguém em nossa comunidade?</Text>
            <Image
              source={require('../../../assets/img/icons/comunidade.png')}
              style={styles.relaxImg}/>
              </TouchableOpacity>
          </View>
          <View style={styles.card}>
          <TouchableOpacity>
            <Text style={styles.cardText}>Talvez um som relaxante</Text>
            <Image
              source={require('../../../assets/img/icons/som_relaxante.png')}
              style={styles.relaxImg}/>
              </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Ou conversar com alguém em nossa comunidade?</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e6e6e6',
 
    },
  feeling: {
    marginVertical: 20,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  containerUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Garante que o texto ocupe o espaço restante
  },
  userText: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  textFeeling: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  img: {
    width: '40%',
    height: undefined,
    aspectRatio:1,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius:20
  },
 
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextConsulta: {
    bottom: 10,
  },
  textConsulta: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Mukta-Bold', // Fonte personalizada
    textAlign: 'left',
    paddingLeft: 15,
  },
  cardConsulta: {
    backgroundColor: '#ECDAFF',
    padding: 10,
    margin: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  nameProf: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contatoProf: {
    fontWeight: 'bold',
  },
  emailImg: {
    width: 20,
    height: 20,
  },
  dadosPsi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dadoConsulta: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 65,
  },
  dateConsulta: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dadosConsulta: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  dadosLocConsulta: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  maps: {
    flexDirection: 'row',
  },
  mapsImg: {
    width: 20,
    height: 20,
  },
  containerRelax: {
    margin: 15,
  },
  textRelax: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Mukta-Bold', // Fonte personalizada
    textAlign: 'left',
    paddingLeft: 15,
    
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Para espaçar os cards
  },
  card: {
    backgroundColor: '#7E60BF',
    width: '45%', // Cada card vai ocupar 45% da largura
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    
    
  },
  cardText:{
    color:'white',
    alignItems:'flex-start'
  },
  relaxImg:{
    width:'80%',
    height:undefined,
    aspectRatio:1,
    left:10,
    resizeMode:'contain'
  }
});
