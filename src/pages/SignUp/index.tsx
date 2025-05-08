import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Platform
} from 'react-native';
import { User, Mail, Lock, Calendar, Phone, MapPin, IdCard, MapPinHouse, Binary } from 'lucide-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list'


export default function SignUp() {
  const navigation = useNavigation();
  const goLogin = () => {
    navigation.navigate('Login');
  };

  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  

  // Estados para o dropdown de gênero
  
  const [gender, setGender] = useState(null);
  const genderItem= [
    {key: 'cism', value: 'Homem cisgênero'},
    {key: 'cisf', value: 'Mulher cisgênero'},
    {key: 'transm', value: 'Homem transgênero'},
    {key: 'transf', value: 'Mulher transgênero'},
    {key: 'nbin', value: 'Não-binário'},
    {key: 'naodizer', value: 'Prefiro não dizer'}
  ];
  const enderecoCompleto = `${endereco}${numero ? ', ' + numero : ''}${bairro ? ' - ' + bairro : ''}${cidade ? ', ' + cidade : ''}${uf ? '/' + uf : ''}`;
  const inputFields = [
    { 
      placeholder: 'Nome', 
      key: 'name', 
      icon: <User color="#3386BC" size={20} />, 
      fullWidth: true,
      value: name,
      onChangeText: setName
    },
    {
      placeholder: 'Data de nascimento', 
      key: 'birthDate', 
      keyboardType: 'numeric',
      icon: <Calendar color="#3386BC" size={20} />,
      maxLength: 10,
      value: birthDate,
      onChange: (text) => {
        let cleanedText = text.replace(/\D/g, '');
        if (cleanedText.length > 4) {
          cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}/${cleanedText.slice(4, 8)}`;
        } else if (cleanedText.length > 2) {
          cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
        }
        setBirthDate(cleanedText);
      }
    },
    {
      placeholder: 'CPF',
      key: 'cpf',
      icon: <IdCard color="#3386BC" size={20} />,
      keyboardType: 'numeric',
      maxLength: 14,
      value: cpf,
      onChange: (text) => {
        let cpfCleaned = text.replace(/\D/g, '');
    
        if (cpfCleaned.length <= 3) {
          setCPF(cpfCleaned);
        } else if (cpfCleaned.length <= 6) {
          setCPF(`${cpfCleaned.slice(0, 3)}.${cpfCleaned.slice(3)}`);
        } else if (cpfCleaned.length <= 9) {
          setCPF(`${cpfCleaned.slice(0, 3)}.${cpfCleaned.slice(3, 6)}.${cpfCleaned.slice(6)}`);
        } else {
          setCPF(`${cpfCleaned.slice(0, 3)}.${cpfCleaned.slice(3, 6)}.${cpfCleaned.slice(6, 9)}-${cpfCleaned.slice(9, 11)}`);
        }
      }
    },
    {
      key: 'genderPicker',
      render: () => (
        <SelectList 
        setSelected={(val) => setGender(val)} 
        data={genderItem} 
        save="value"
        placeholder='Selecione a identidade de gênero'
        boxStyles={{backgroundColor:'#ffffff', borderRadius:20, width:'85%', marginBottom:10, borderWidth:0}}
        search={false}
        dropdownTextStyles={{color:'#3386bc'}}
        inputStyles={{color:'#3386bc', fontSize:16}}
        dropdownStyles={{backgroundColor:'#ffffff', top:-15, borderRadius:20,borderWidth:0}}
    />
      )
    },
    { 
      placeholder: 'Telefone', 
      key: 'phone', 
      icon: <Phone color="#3386BC" size={20} />, 
      keyboardType: 'numeric', 
      fullWidth: true,
      value: phone,
      onChangeText: setPhone
    },
    { 
      placeholder: 'Endereço de e-mail', 
      key: 'email', 
      icon: <Mail color="#3386BC" size={20} />, 
      fullWidth: true,
      value: email,
      onChangeText: setEmail
    },
    { 
      placeholder: 'Senha', 
      key: 'password', 
      icon: <Lock color="#3386BC" size={20} />, 
      secure: true, 
      fullWidth: true,
      value: password,
      onChangeText: setPassword
    },
    {
      key: 'row2',
      fields: [
        {
          placeholder: 'CEP', 
          key: 'zipCode', 
          icon: <MapPin color="#3386BC" size={20} />, 
          flex: 1, 
          keyboardType: 'numeric',
          value: cep,
          onChange: (text) => {
            setCep(text);
            if (text.length === 8) chamarCep(text);
          }
        },
        { 
          placeholder: 'Nº', 
          key: 'addressNumber', 
          icon: <Binary color="#3386BC" size={20} />, 
          keyboardType: 'numeric', 
          flex: 0.5,
          value: numero,
          onChangeText: setNumero
        }
      ]
    },
    { 
      placeholder: 'Endereço', 
      key: 'address', 
      icon: <MapPinHouse color="#3386BC" size={20} />, 
      flex: 1.5,
      value: enderecoCompleto,
      editable: false
    },
  ];

  async function chamarCep(cep) {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      const req = await fetch(url);
      const data = await req.json();

      if (!data.erro) {
        setEndereco(data.logradouro || '');
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setUf(data.uf || '');
      } else {
        console.log("CEP não encontrado");
        setEndereco('');
        setBairro('');
        setCidade('');
        setUf('');
      }
    } catch (error) {
      console.log("Erro ao buscar o CEP: " + error);
      setEndereco('');
      setBairro('');
      setCidade('');
      setUf('');
    }
  }

  

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }, [])
  );

  return (
    <ImageBackground
      source={require('../../../assets/img/gradiente.png')}
      style={styles.gradientBackground}
      blurRadius={20}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          
        
          <Text style={styles.title}>INSCREVA-SE</Text>
          <Text style={styles.subtitle}>Crie sua conta!</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
        
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled" // Permite tocar no dropdown
        >
          {inputFields.map((field) =>  (
            field.render ? (
              <React.Fragment key={field.key}>{field.render()}</React.Fragment>
            ) : field.fields ? (
              <View key={field.key} style={styles.rowContainer}>
                {field.fields.map((subField) => (
                  <View key={subField.key} style={[styles.inputWrapper, { flex: subField.flex || 1, marginHorizontal: 4 }]}>
                    <View style={styles.iconContainer}>{subField.icon}</View>
                    <TextInput
                      placeholder={subField.placeholder}
                      placeholderTextColor="#3386BC"
                      style={styles.input}
                      value={subField.value}
                      onChangeText={subField.onChangeText || subField.onChange}
                      keyboardType={subField.keyboardType}
                      maxLength={subField.maxLength}
                      secureTextEntry={subField.secure || false}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View key={field.key} style={[styles.inputWrapper, { width: '85%' }]}>
                <View style={styles.iconContainer}>{field.icon}</View>
                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor="#3386BC"
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.onChangeText || field.onChange}
                  keyboardType={field.keyboardType}
                  maxLength={field.maxLength}
                  secureTextEntry={field.secure || false}
                  editable={field.editable !== false}
                />
              </View>
            )
          ))}

          <View style={{ top: 30 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 11, bottom: 15 }}>Se registrando, você concorda com os nossos</Text>
            <TouchableOpacity>
              <Text style={{
                textAlign: 'center', color: 'white', fontSize: 11, bottom: 15, textDecorationLine: 'underline',
                textShadowColor: 'rgba(255, 255, 255, 0.5)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 3,
              }}>Termos de uso e a Politica de privacidade.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={goLogin}>
              <Text style={styles.buttonText}>Inscreva-se</Text>
            </TouchableOpacity>
          </View>
          <View style={{ top: 30, flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 14, bottom: 15 }}>Você tem uma conta?</Text>
            <TouchableOpacity onPress={goLogin}>
              <Text style={{
                textAlign: 'center', color: 'white', fontSize: 14, bottom: 15, textDecorationLine: 'underline',
                textShadowColor: 'rgba(255, 255, 255, 0.5)',
                textShadowOffset: { width: 0.5, height: 1 },
                textShadowRadius: 3, left: 5, fontWeight: 'bold'
              }}>Faça Login.</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: '#3386BC'
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    
  },
  
  
  title: {
    color: '#F8F7FF',
    fontSize: 28,
    fontWeight: '600',
    bottom: 50,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: '#F8F7FF',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: -50,
    bottom: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '87%',
    marginBottom: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    height: 46,
    marginBottom: 10
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    paddingRight: 15,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  textButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    top: 40
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#3D9CDA',
    height: 40,
    width: 252,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.50,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    bottom: 30
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
