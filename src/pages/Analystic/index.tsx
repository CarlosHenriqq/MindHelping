import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Analystic = () => {
  const navigation = useNavigation();
  const [dailyFeelings, setDailyFeelings] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const getDailyFeelings = async () => {
        try {
          const storedFeelings = await AsyncStorage.getItem('@dailyFeelings');
          const parsedFeelings = storedFeelings ? JSON.parse(storedFeelings) : {};
          setDailyFeelings(parsedFeelings);
        } catch (e) {
          console.log("Erro ao ler os sentimentos diários: ", e);
        }
      };
      getDailyFeelings();
    }, [])
  );

  const handleDayPress = (day) => {
    setSelectedDay(day);
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setSelectedFeeling(dailyFeelings[today] || 'Nenhum sentimento registrado');
    setModalVisible(true);
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // Exemplo de 31 dias

  return (
    <View style={styles.container}>
      <View style={styles.Seta}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        {daysInMonth.map((day) => (
          <TouchableOpacity key={day} style={styles.calendarDay} onPress={() => handleDayPress(day)}>
            <Text style={styles.calendarDate}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Dia {selectedDay}</Text>
          <Text style={styles.modalText}>Sentimento: {selectedFeeling}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Analystic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  Seta: {
    alignItems: 'flex-start',
  },
  botaoVoltar: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '28%', // Ajuste para garantir que caibam 3 dias por linha
    backgroundColor: '#e6e6e6',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  calendarDate: {
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
