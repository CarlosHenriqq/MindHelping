import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const Metas = () => {
  // Estado para controlar o progresso de cada meta
  const [metas, setMetas] = useState([]);

  // Estado para o modal e campos de nova meta
  const [modalVisible, setModalVisible] = useState(false);
  const [novaMetaText, setNovaMetaText] = useState('');
  const [numeroDias, setNumeroDias] = useState(30);

  // Carrega as metas salvas ao iniciar o app
  useEffect(() => {
    const loadMetas = async () => {
      const savedMetas = await AsyncStorage.getItem('@metas');
      if (savedMetas) {
        setMetas(JSON.parse(savedMetas));
      }
    };
    loadMetas();
  }, []);

  // Salva as metas no AsyncStorage sempre que o array de metas for atualizado
  useEffect(() => {
    const saveMetas = async () => {
      await AsyncStorage.setItem('@metas', JSON.stringify(metas));
    };
    saveMetas();
  }, [metas]);

  // Verifica se o usuário já interagiu com cada meta hoje
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

  // Atualiza o progresso e salva a data do clique
  const handlePress = async (metaId) => {
    const today = new Date().toISOString().split('T')[0];

    // Atualiza o estado da meta
    const updatedMetas = metas.map((meta) => {
      if (meta.id === metaId) {
        const newDaysCompleted = meta.daysCompleted + 1; // Incrementa o contador de dias
        return { ...meta, daysCompleted: newDaysCompleted, disabled: true }; // Desabilita o botão
      }
      return meta;
    });
    setMetas(updatedMetas);

    // Salva a data do clique e o número de dias completos no AsyncStorage
    await AsyncStorage.setItem(`@lastClickDate_${metaId}`, today);
    await AsyncStorage.setItem(`@daysCompleted_${metaId}`, updatedMetas.find((meta) => meta.id === metaId).daysCompleted.toString());
  };

  // Carrega os dias completos ao iniciar a tela
  const loadDaysCompleted = async () => {
    const updatedMetas = await Promise.all(
      metas.map(async (meta) => {
        const daysCompleted = await AsyncStorage.getItem(`@daysCompleted_${meta.id}`);
        return { ...meta, daysCompleted: daysCompleted ? parseInt(daysCompleted) : 0 };
      })
    );
    setMetas(updatedMetas);
  };

  // Verifica os cliques e carrega os dias completos ao carregar a tela
  useEffect(() => {
    checkIfClickedToday();
    loadDaysCompleted();
  }, []);

  // Função para excluir uma meta
  const excluirMeta = (metaId) => {
    const updatedMetas = metas.filter((meta) => meta.id !== metaId); // Remove a meta do array
    setMetas(updatedMetas); // Atualiza o estado
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container} // Aplica o estilo ao conteúdo do ScrollView
    >
      <View style={styles.textMetas}>
        <Text style={styles.text}>Minhas Metas</Text>
      </View>
      <View style={styles.cardsMeta}>
        {metas.map((meta) => {
          const progress = (meta.daysCompleted / meta.totalDias) * 100; // Calcula o progresso com base nos dias personalizados

          return (
            <View key={meta.id} style={styles.cardContainer}>
              <TouchableOpacity
                style={[styles.cards, meta.disabled && styles.disabledCard]} // Aplica estilo de desabilitado
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
                        stroke="#CCCCCC" // Cor de fundo do círculo
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <Circle
                        cx="20"
                        cy="20"
                        r="15"
                        stroke="#00FF00" // Cor do progresso
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
                onPress={() => excluirMeta(meta.id)} // Exclui a meta ao clicar no ícone
              >
                <Image
                  source={require('../../../assets/img/lixeira.png')} // Caminho do ícone de lixeira
                  style={styles.lixeiraIcon}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View>
        <TouchableOpacity
          style={styles.newMetaContainer}
          onPress={() => setModalVisible(true)} // Abre o modal
        >
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>Adicionar nova meta</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para adicionar nova meta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Fecha o modal ao pressionar o botão de voltar (Android)
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
                // Adiciona a nova meta
                const novaMeta = {
                  id: metas.length + 1,
                  text: novaMetaText,
                  daysCompleted: 0,
                  disabled: false,
                  totalDias: numeroDias, // Adiciona o número de dias personalizado
                };
                setMetas([...metas, novaMeta]);
                setModalVisible(false); // Fecha o modal
                setNovaMetaText(''); // Limpa o campo de texto
                setNumeroDias(30); // Reseta o número de dias para o valor padrão
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
    </ScrollView>
  );
};

export default Metas;

const styles = StyleSheet.create({
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
    justifyContent: 'space-between', // Alinha o texto e o gráfico
    padding: 16,
    flexDirection: 'row', // Organiza o conteúdo em linha
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  disabledCard: {
    opacity: 0.5, // Reduz a opacidade do botão desabilitado
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
    fontWeight: 'bold',
    marginTop: 4,
  },
  lixeiraContainer: {
    width: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lixeiraIcon: {
    width: 20,
    height: 20,
  },
  newMetaContainer: {
    width: 385,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
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