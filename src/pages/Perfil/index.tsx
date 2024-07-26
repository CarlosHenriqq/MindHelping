import React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Perfil = () => {

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#e6e6e6');
    }, [])
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.profileText}>Perfil</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../../assets/img/perfil.png')}
            style={styles.perfil}
          />
        </View>
        <Text style={styles.nome}>Carlos Henrique</Text>
        <Text style={styles.email}>exemplo@email.com</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.textPerfil}>Nome:</Text>
        <Text style={styles.textPerfil}>E-mail:</Text>
      </View>
    </View>
  );
}

export default Perfil;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  header: {
    backgroundColor: '#68327e',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  profileText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -30,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
  },
  nome: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  textPerfil: {
    fontSize: 18,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 5,
  }
});
