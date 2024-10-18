import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from 'react-native-chart-kit'; // Usando BarChart para gráfico de barras

const Analystic = () => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Mês atual (0-11)
  const currentYear = currentDate.getFullYear(); // Ano atual
  const [dailyFeelings, setDailyFeelings] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState('');

  const feelingColors = {
    FELIZ: '#edd892', // Dourado
    TRISTE: '#6f9ceb', // Azul
    RAIVA: '#ef6865', // Vermelho
    ANSIOSO: '#f1bb87', // Verde
    TEDIO: '#918ef4', // Roxo
    NEUTRO: '#A9A9A9' // Cinza
  };

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
    const dateKey = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setSelectedFeeling(dailyFeelings[dateKey] || 'Nenhum sentimento registrado');
    setModalVisible(true);
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Contar a ocorrência de cada sentimento
  const feelingCounts = {
    FELIZ: 0,
    TRISTE: 0,
    RAIVA: 0,
    ANSIOSO: 0,
    TEDIO: 0,
    NEUTRO: 0
  };

  Object.values(dailyFeelings).forEach(feeling => {
    if (feelingCounts[feeling] !== undefined) {
      feelingCounts[feeling]++;
    }
  });

  // Preparar os dados do gráfico com as legendas
  const chartData = {
    labels: ['Feliz', 'Triste', 'Raiva', 'Ansioso', 'Tédio', 'Neutro'], // Alterar legendas aqui
    datasets: [
      {
        data: Object.values(feelingCounts), // A contagem de cada sentimento
      }
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.Seta}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
        <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSetaHeader}
          />
        </TouchableOpacity>
        <Text>Voltar</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>Dias da semana</Text>
        <View style={styles.calendar}>
          {daysInMonth.map((day) => {
            const dateKey = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
            const feeling = dailyFeelings[dateKey];
            const backgroundColor = feelingColors[feeling] || '#ffffff';
            return (
              <TouchableOpacity
                key={day}
                style={[styles.calendarDay, { backgroundColor }]}
                onPress={() => handleDayPress(day)}
              >
                <Text style={styles.calendarDate}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.containerLegenda}>
      
      {Object.entries(feelingColors).map(([feeling, color]) => (
        <View key={feeling} style={styles.legendaItem}>
          <View style={[styles.colorBox, { backgroundColor: color }]} />
          <Text style={styles.legendaText}>{feeling}</Text>
        </View>
      ))}
    </View>
      </View>

      {/* Gráfico de Barras */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sentimentos no Mês</Text>
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 40} // Largura do gráfico
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#ced5dc',
            backgroundGradientFrom: '#F0F4F8',
            backgroundGradientTo: '#F0F4F8',
            decimalPlaces: 0, // Número de casas decimais
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor das barras
            labelColor: (opacity = 1) => '#000000', // Cor das labels
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.6,
          }}
          style={{
            borderRadius: 16,
            top: 50,
        
          }}
        />
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
    backgroundColor: '#A7BED3',
  },
  Seta: {
    alignItems: 'center',
    flexDirection:'row',
    gap:5
  },
  botaoVoltar: {
    padding: 10,
    borderRadius: 5,
    left:10,
    
  },
  imagemSetaHeader: {
    width: 25,
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    
    transform: [{ scaleX: -1 }],
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin:10
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding:5,
  },
  calendarDay: {
    width: 40,
    height: 30,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#5f7a93',
    borderRadius: 40,
    paddingLeft:5
  },
  calendarDate: {
    fontWeight: 'bold',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  chartContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 20,
    color: '#000000',
  },
  containerLegenda: {
    justifyContent:'space-between',
   flexDirection:'row',
    backgroundColor: '#f0f4f8',
    marginTop:5
    
  },

  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:5
    
  },
  colorBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginRight: 5,
  },
  legendaText: {
    fontSize: 10,
    gap:5,
    color:'#000000'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
