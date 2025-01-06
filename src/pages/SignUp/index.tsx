import React, { useState } from 'react';
import { StatusBar,View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView,TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function SignUp() {
  const [toggleCheck1, setToggleCheck1] = useState(false);
  const [toggleCheck2, setToggleCheck2] = useState(false)
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      
    }, [])
  );


  return (
    <LinearGradient
            colors={["#B8E4C9", "#A3D8F4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground} >
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
            placeholderTextColor={'#000000'}
          />
          <Text style={styles.textoI}>EMAIL</Text>
          <TextInput
            placeholder='Digite seu e-mail'
            style={styles.input}
            placeholderTextColor={'#000000'}
          />
          <Text style={styles.textoI}>REPITA O E-MAIL</Text>
          <TextInput
            placeholder='Repita seu e-mail'
            style={styles.input}
            placeholderTextColor={'#000000'}
          />
          <Text style={styles.textoI}>SENHA (MIN 4 CARACTÉRES)</Text>
          <TextInput
            placeholder='Crie uma senha'
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={'#000000'}
          />
          <Text style={styles.textoI}>REPITA A SENHA</Text>
          <TextInput
            placeholder='Repita a senha'
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={'#000000'}
          />
          <View style={styles.checkContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheck1}
              onValueChange={(newValue) => setToggleCheck1(newValue)}
              style={styles.check}
              tintColors={{ true: '#808F82', false: '#000000' }}
            />
            <Text style={styles.title}>Aceito os termos e condições</Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheck2}
              onValueChange={(newValue) => setToggleCheck2(newValue)}
              style={styles.check}
              tintColors={{ true: '#808F82', false: '#000000' }}
            />
            <Text style={styles.title}>Autorizo o envio de notificações</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('TabNavigation')}>
                    <Text style={styles.buttonText}>REGISTRAR</Text> 
                </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground:{
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    backgroundColor: '#ededed',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    flex:1

  },
  textoI: {
    alignSelf: 'flex-start',
    paddingLeft:-0,
    marginTop: 10,
    marginBottom: 3,
    color:'#000000',
    fontWeight:'bold'
  },
  input: {
    borderColor: '#000000',
    borderBottomWidth: 1,
    borderRadius: 10,
    width: 400,
    left:5,
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
    color:'#000000',
    fontWeight:'bold'
  },
  button:{
    marginTop:25,
    borderColor:'#000000',
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
    color:'#000000'
  }
});
