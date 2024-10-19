import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit'; // Certifique-se de ter a biblioteca instalada corretamente
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.Seta}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
          <Image
            source={require('../../../assets/img/seta.png')}
            style={styles.imagemSetaHeader}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.Title}>
        <Text style={styles.textTitle}>Perfil</Text>
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
        </View>
      </View>

      <View style={styles.containerPerfil}>
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

     

      
    </ScrollView>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 'auto',
  },
  Seta: {
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
  },
  Title:{
    alignItems: 'center',
    bottom: 10,
  },
  textTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagemSetaHeader: {
    width: 30,
    height: 20,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 10,
    transform: [{ scaleX: -1 }],
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20, 
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    backgroundColor: '#ffffff',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
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
    marginTop: 15,
    alignItems: 'center',
  },
  nome: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#000000',
  },
  email: {
    fontSize: 14,
    color: '#000000',
    marginTop: 5,
    fontStyle: 'italic',
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
    marginTop: 0,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  legendContainer: {
    marginTop: 20,
    backgroundColor: '#f0f4f8',
    padding: 10,
    borderRadius: 10,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendText: {
    fontSize: 14,
  },
});
