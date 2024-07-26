import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView,TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const [toggleCheck1, setToggleCheck1] = useState(false);
  const [toggleCheck2, setToggleCheck2] = useState(false)
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/img/logo.png')} style={styles.imagem} />
        </View>

        <View style={styles.register}>
          <Text style={styles.textoI}>NOME</Text>
          <TextInput
            placeholder='Digite seu nome'
            style={styles.input}
            placeholderTextColor={'#68327e'}
          />
          <Text style={styles.textoI}>EMAIL</Text>
          <TextInput
            placeholder='Digite seu e-mail'
            style={styles.input}
            placeholderTextColor={'#68327e'}
          />
          <Text style={styles.textoI}>REPITA O E-MAIL</Text>
          <TextInput
            placeholder='Repita seu e-mail'
            style={styles.input}
            placeholderTextColor={'#68327e'}
          />
          <Text style={styles.textoI}>SENHA (MIN 4 CARACTÉRES)</Text>
          <TextInput
            placeholder='Crie uma senha'
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={'#68327e'}
          />
          <Text style={styles.textoI}>REPITA A SENHA</Text>
          <TextInput
            placeholder='Repita a senha'
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={'#68327e'}
          />
          <View style={styles.checkContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheck1}
              onValueChange={(newValue) => setToggleCheck1(newValue)}
              style={styles.check}
              tintColors={{ true: '#5D1576', false: '#68327e' }}
            />
            <Text style={styles.title}>Aceito os termos e condições</Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheck2}
              onValueChange={(newValue) => setToggleCheck2(newValue)}
              style={styles.check}
              tintColors={{ true: '#4B0082', false: '#68327e' }}
            />
            <Text style={styles.title}>Autorizo o envio de notificações</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Tab')}>
                    <Text style={styles.buttonText}>REGISTRAR</Text> 
                </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E4FF',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  imagem: {
    width: 148,
    height: 148,
  },
  register: {
    backgroundColor: '#F7E4FF',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    flex:1

  },
  textoI: {
    alignSelf: 'flex-start',
    paddingLeft:10,
    marginTop: 10,
    marginBottom: 3,
    color:'#68327e',
    fontWeight:'bold'
  },
  input: {
    borderColor: '#68327e',
    borderBottomWidth: 1,
    borderRadius: 10,
    width: 400,
    justifyContent: 'flex-start',
    paddingStart: 10,
    height: 40,
    marginBottom: 10,
    fontSize:14
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  check: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    color:'#68327e',
    fontWeight:'bold'
  },
  button:{
    marginTop:25,
    borderColor:'#68327e',
    borderWidth:1.5,
    borderRadius:15,
    width:250,
    height:45,
    textAlign:'center',
  },
  buttonText:{
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:10,
    padding:5,
    fontWeight:'bold',
    color:'#68327e'
  }
});
