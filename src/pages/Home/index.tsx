import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const Home = () => {
 
  const [feelings] = useState([
    { text: "FELIZ", image: require('../../../assets/img/slide/feliz.png') },
    { text: "TRISTE", image: require('../../../assets/img/slide/triste.png') },
    { text: "RAIVA", image: require('../../../assets/img/slide/raiva.png') },
    { text: "ANSIOSO", image: require('../../../assets/img/slide/ansioso.png') },
    { text: "TEDIO", image: require('../../../assets/img/slide/tedio.png') },
    { text: "NEUTRO", image: require('../../../assets/img/slide/indeciso.png') },
  ]);
  const [modalSelected, setModalSelect] = useState(false);
  const[inputText, setInputText] = useState('');
  const[textosSalvos, setTextosSalvos] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState();
  const [selectedFeelingIndex, setSelectedFeelingIndex] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const loadFeeling = async () => {
        const storedFeeling = await AsyncStorage.getItem('@selectedFeeling');
        setSelectedFeeling(storedFeeling || null);
        
    
      };
       

      loadFeeling();

      ;
    }, [])
  );
  
  
  const handlePress = async (feeling) => {
    setSelectedFeeling(feeling);
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    try {
      const storedFeelings = await AsyncStorage.getItem('@dailyFeelings');
      const dailyFeelings = storedFeelings ? JSON.parse(storedFeelings) : {};
  
      dailyFeelings[today] = feeling;
  
      await AsyncStorage.setItem('@dailyFeelings', JSON.stringify(dailyFeelings));
      console.log(`Sentimento de hoje (${today}): ${feeling}`);
    } catch (e) {
      console.log("Erro ao salvar o sentimento diário: ", e);
    }
  };
  const registerFeelingWithTime = async (feeling) => {
    const currentTime = new Date().toISOString().split('T')[1].substring(0, 5); // Formato HH:MM
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
    try {
      const storedFeelings = await AsyncStorage.getItem('@dailyFeelings');
      const dailyFeelings = storedFeelings ? JSON.parse(storedFeelings) : {};
      
      if (!Array.isArray (dailyFeelings[today])) {
        dailyFeelings[today] = [];
      }
  
      dailyFeelings[today].push({ feeling, time: currentTime });
  
      await AsyncStorage.setItem('@dailyFeelings', JSON.stringify(dailyFeelings));
      console.log(`Sentimento registrado às ${currentTime}: ${feeling}`);
    } catch (e) {
      console.log("Erro ao registrar o sentimento: ", e);
    }
  };
   const modalSelecionado = () =>{
      setModalSelect(true)
      
   }
   const salvarTexto = () => {
    if (inputText.trim()) {
      setTextosSalvos([...textosSalvos, inputText]);
      setInputText('');
      setModalSelect(false);[
        console.log(textosSalvos)
      ]
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
          <TouchableOpacity onPress={() => {
            navigation.navigate('Perfil')
          }}>
            <Image source={require('../../../assets/img/perfil.png')} style={styles.imgUser} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Desabilitar o autoplay para evitar problemas com a seleção */}
      <Swiper 
      loop={true} 
      autoplay={true} 
      autoplayTimeout={5}
      style={{ height: 200 }} 
      showsPagination={false}  
      onIndexChanged={(index) => setSelectedFeelingIndex(index)}>
        {feelings.map((item, index) => (
          <View key={index} style={styles.slide}>
            <TouchableOpacity onPress={() =>{ 
              registerFeelingWithTime(item.text)
               handlePress(item.text)
               modalSelecionado()
               }}>
              <Image source={item.image} style={styles.img} />
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSelected}
        onRequestClose={() => setModalSelect(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Porquê você está se sentindo assim?</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite aqui"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={salvarTexto}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.nextConsulta}>
        <Text style={styles.textConsulta}>Sua próxima consulta: </Text>
        <View style={styles.cardConsulta}>
          <Text style={styles.nameProf}>Dra. Alessandra</Text>
          <Text>Psicóloga</Text>
          <View style={styles.dadosPsi}>
            <TouchableOpacity>
              <Image source={require('../../../assets/img/icons/email.png')} style={styles.emailImg} />
            </TouchableOpacity>
            <Text style={styles.contatoProf}>alessandra.psi@gmail.com</Text>
            </View>
            <View style={styles.telePsi}>
            <TouchableOpacity>
              <Image source={require('../../../assets/img/icons/telefone.png')} style={styles.emailImg} />
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
                <Image source={require('../../../assets/img/icons/maps.png')} style={styles.mapsImg} />
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
              <Text style={styles.cardText}>Que tal tentarmos meditar?</Text>
              <Image source={require('../../../assets/img/icons/meditacao.png')} style={styles.relaxImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <TouchableOpacity>
              <Text style={styles.cardText}>Ou conversar com a nossa comunidade?</Text>
              <Image source={require('../../../assets/img/icons/comunidade.png')} style={styles.relaxImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <TouchableOpacity>
              <Text style={styles.cardText}>Talvez um som relaxante</Text>
              <Image source={require('../../../assets/img/icons/som_relaxante.png')} style={styles.relaxImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <TouchableOpacity>
              <Text style={styles.cardText}>Por quê não praticar um esporte?</Text>
              <Image source={require('../../../assets/img/icons/esporte.png')} style={styles.relaxImg} />
            </TouchableOpacity>
          </View>
          
        </View>
        
      </View>
      
    </ScrollView>
  );
};

export default Home;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ededed',
 
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
    flex: 1, 
    top: 2// Garante que o texto ocupe o espaço restante
  },
  userText: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    top:5
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
    maxWidth: '95%',
    height: '95%',
    alignSelf: 'center',
    borderRadius: 20,
  },
 
  slide: {
 
    width:'100%',
    height:200,
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative',
   
  },
  nextConsulta: {
    top: 20,
  },
  textConsulta: {
    fontSize: 16,
    marginBottom: -5,
    fontFamily: 'Mukta-Bold', // Fonte personalizada
    textAlign: 'left',
    paddingLeft: 22,
  },
  cardConsulta: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
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
    gap:10,
    
    marginTop:5
  },
  telePsi:{
    flexDirection:'row',
    gap:10,
    marginBottom:5
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
    paddingLeft: 10,
    
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Para espaçar os cards
  },
  card: {
    backgroundColor: '#3386bc',
    width: '45%', // Cada card vai ocupar 45% da largura
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    
    
    
  },
  cardText:{
    color:'black',
    alignItems:'flex-start',
    fontWeight:'bold', 
    paddingBottom:10
  },
  relaxImg:{
    width:'80%',
    height:undefined,
    aspectRatio:1,
    left:10,
    resizeMode:'contain'
  },
  continueButton: {
    backgroundColor: '#A7BED3',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth:1
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#2980B9',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});