import React, { useState, useEffect } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Trash2 } from 'lucide-react-native';



const Metas = () => {
  const [metas, setMetas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [novaMetaText, setNovaMetaText] = useState('');
  const [numeroDias, setNumeroDias] = useState(30);

  useEffect(() => {
    const loadMetas = async () => {
      const savedMetas = await AsyncStorage.getItem('@metas');
      if (savedMetas) {
        setMetas(JSON.parse(savedMetas));
      }
    };
    loadMetas();
  }, []);

  useEffect(() => {
    const saveMetas = async () => {
      await AsyncStorage.setItem('@metas', JSON.stringify(metas));
    };
    saveMetas();
  }, [metas]);

  const checkIfClickedToday = async () => {
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const updatedMetas = await Promise.all(
      metas.map(async (meta) => {
        const lastClickDate = await AsyncStorage.getItem(`@lastClickDate_${meta.id}`);

        if (lastClickDate === today) {
          return { ...meta, disabled: true }; // Desabilita o botão se já clicou hoje
        }
        return meta;
      })
    );

    setMetas(updatedMetas);
  };

  const handlePress = async (metaId) => {
    const today = new Date().toISOString().split('T')[0];
  
    const updatedMetas = metas.map((meta) => {
      if (meta.id === metaId) {
        const newDaysCompleted = meta.daysCompleted + 1;
        return { ...meta, daysCompleted: newDaysCompleted, disabled: true };
      }
      return meta;
    });
  
    setMetas(updatedMetas);
  
    await AsyncStorage.setItem(`@lastClickDate_${metaId}`, today);
    await AsyncStorage.setItem(`@daysCompleted_${metaId}`, updatedMetas.find(meta => meta.id === metaId).daysCompleted.toString());
  };
  
  const loadDaysCompleted = async () => {
    const updatedMetas = await Promise.all(
      metas.map(async (meta) => {
        const daysCompleted = await AsyncStorage.getItem(`@daysCompleted_${meta.id}`);
        return { ...meta, daysCompleted: daysCompleted ? parseInt(daysCompleted, 10) : 0 };
      })
    );
    setMetas(updatedMetas);
  };

  useEffect(() => {
    checkIfClickedToday();
    loadDaysCompleted();
  }, []);

  const excluirMeta = (metaId) => {
    const updatedMetas = metas.filter((meta) => meta.id !== metaId);
    setMetas(updatedMetas);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textMetas}>
          <Text style={styles.text}>Minhas Metas</Text>
        </View>
        <View style={styles.cardsMeta}>
          {metas.map((meta) => {
            const progress = (meta.daysCompleted / meta.totalDias) * 100;

            return (
              <View key={meta.id} style={styles.cardContainer}>
                <TouchableOpacity
                  style={[styles.cards, meta.disabled && styles.disabledCard]}
                  onPress={() => handlePress(meta.id)}
                  disabled={meta.disabled}
                >
                  <Text style={styles.textCard}>{meta.text}</Text>
                  <View style={styles.chartContainer}>
                    <Svg width="40" height="40">
                      <G rotation="-90" origin="20, 20">
                        <Circle
                          cx="20"
                          cy="20"
                          r="15"
                          stroke="#CCCCCC"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <Circle
                          cx="20"
                          cy="20"
                          r="15"
                          stroke="#00FF00"
                          strokeWidth="4"
                          strokeDasharray={2 * Math.PI * 15}
                          strokeDashoffset={(2 * Math.PI * 15) - ((2 * Math.PI * 15 * progress) / 100)}
                          fill="transparent"
                        />
                      </G>
                    </Svg>
                    <Text style={styles.daysText}>{meta.daysCompleted}/{meta.totalDias}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.lixeiraContainer}
                  onPress={() => excluirMeta(meta.id)}
                >
                <Trash2 color="red" size={28} style={{left:15, top:15}}/>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.newMetaContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35 }}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Nova Meta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da meta"
              value={novaMetaText}
              onChangeText={setNovaMetaText}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de dias"
              keyboardType="numeric"
              value={numeroDias.toString()}
              onChangeText={(text) => setNumeroDias(Number(text))}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                if (novaMetaText.trim() === '' || numeroDias <= 0) {
                  alert('Por favor, preencha os campos corretamente.');
                  return;
                }
                const novaMeta = {
                  id: metas.length + 1,
                  text: novaMetaText,
                  daysCompleted: 0,
                  disabled: false,
                  totalDias: numeroDias,
                };
                setMetas([...metas, novaMeta]);
                setModalVisible(false);
                setNovaMetaText('');
                setNumeroDias(30);
              }}
            >
              <Text style={styles.modalButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Metas;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative', // Permitirá o botão flutuar no final da tela
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  textMetas: {
    marginTop: 20,
  },
  text: {
    color: 'black',
    fontWeight: '300',
    fontSize: 22,
  },
  cardsMeta: {
    width: '100%',
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cards: {
    backgroundColor: 'white',
    borderColor: 'black',
    width: '90%',
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  disabledCard: {
    opacity: 0.5,
  },
  textCard: {
    fontSize: 16,
    fontWeight: '500',
  },
  chartContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  lixeiraContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  lixeiraIcon: {
    width: 24,
    height: 24,
  },
  newMetaContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2980B9',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#2980B9',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtonCancel: {
    backgroundColor: '#fc445a',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonTextCancel: {
    color: 'white',
    fontWeight: 'bold',
  },
});