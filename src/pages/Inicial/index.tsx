import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const Inicial = () => {
  const navigator = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/img/gradiente.png')}
      style={styles.gradientBackground}
      blurRadius={20}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
        style={styles.principal}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animatable.Text
          animation="fadeInUp"
          duration={1000}
          style={styles.titulo}
        >
          <Text style={styles.tituloNormal}>OLÁ, SEJA {"\n"}</Text>
          <Text style={styles.tituloNegrito}>BEM-VINDO(A)</Text>
        </Animatable.Text>

        <Image
          source={require('../../../assets/img/nome_app.png')}
          style={styles.imagemNome}
          resizeMode='contain'
        />

        <Image
          source={require('../../../assets/img/logo.png')}
          style={styles.imagem}
          resizeMode='contain'
        />

        <Animatable.View style={styles.textButtonContainer}>
          <TouchableOpacity onPress={() => navigator.navigate('SignUp')} style={styles.button}>
            <Text style={styles.newUser}>CRIE UMA CONTA</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigator.navigate('Login')} style={styles.buttonAcess}>
            <Text style={styles.buttonText}>FAÇA LOGIN</Text>
          </TouchableOpacity>
        </Animatable.View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU FAÇA LOGIN COM</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../../../assets/img/icons/icon_google.png')}
            style={styles.googleIcon}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: '#3386BC',
  },
  principal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 20,
    marginTop: height * 0.05,
  },
  tituloNormal: {
    color: 'white',
    fontSize: 32,
  },
  tituloNegrito: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowRadius: 10,
    textShadowOpacity: 0.25,
  },
  imagemNome: {
    width: width * 0.6,
    maxHeight: height * 0.1,
    marginBottom: 20,
  },
  imagem: {
    width: width * 0.6,
    maxHeight: height * 0.2,
    marginBottom: 40,
  },
  textButtonContainer: {
    width: '75%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 15,
    backgroundColor: '#EDEDED',
    height: 46,
    width: 306,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#CCC',
  },
  buttonAcess: {
    borderRadius: 15,
    backgroundColor: '#EDEDED',
    height: 46,
    width: 252,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#CCC',
  },
  buttonText: {
    color: '#3386BC',
    fontSize: 18,
  },
  newUser: {
    color: '#3386BC',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dividerText: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  googleButton: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 40,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
});

export default Inicial;
