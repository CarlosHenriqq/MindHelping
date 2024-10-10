import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Header from '../Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [feelings] = useState([
    { text: "FELIZ", image: require('../../../assets/img/logo.png') },
    { text: "TRISTE", image: require('../../../assets/img/logo.png') },
    { text: "COM RAIVA", image: require('../../../assets/img/logo.png') },
    { text: "ANSIOSO", image: require('../../../assets/img/logo.png') },
    { text: "COM TEDIO", image: require('../../../assets/img/logo.png') },
    { text: "CHATO", image: require('../../../assets/img/logo.png') },
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
    <View style={styles.screen}>
      <Header />
      <View style={styles.feeling}>
        <Text style={styles.textFeeling}>Como você está se sentindo?</Text>
      </View>
      <Swiper
        loop={true}
        autoplay={true}
        autoplayTimeout={5}
        style={styles.wrapper}
       
      >
        {feelings.map((item, index) => (
          <View key={index} style={styles.slide}>
            <TouchableOpacity onPress={() => handlePress(item.text)}>
              <Image source={item.image} style={styles.img} />
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>
      {selectedFeeling && (
        <View style={styles.selectedFeeling}>
          <Text style={styles.selectedFeelingText}>Hoje você está: </Text>
          <Text style={styles.selectedFeelingValue}>{selectedFeeling}</Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  feeling: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 30,
  },
  textFeeling: {
    fontSize: 28,
    fontFamily: 'Roboto-Black', // Use a fonte personalizada aqui
  },
  img: {
    width: 250,
    height: 250,
    marginVertical: 10,
    alignSelf: 'center',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFeeling: {
    alignItems: 'center',
    marginVertical: 20,
  },
  selectedFeelingText: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Mukta-Bold', // Use a fonte personalizada aqui
  },
  selectedFeelingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9381FF',
    fontFamily: 'BarlowCondensed-Medium', // Use a fonte personalizada aqui
  },
  button: {
    backgroundColor: '#9381FF',
    margin: 50,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'BarlowCondensed-Medium', // Use a fonte personalizada aqui
  },
});
