import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Platform,
  Modal
} from 'react-native';
import { User, Mail, Lock, Calendar, Phone, MapPin, IdCard, MapPinHouse, Binary, XCircleIcon } from 'lucide-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import styles from './styles';
import { isValidCPF, isValidPassword, isValidPhone, isValidEmail } from '../../Vallidators/inputValidator'



export default function SignUp() {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({
  name: '',
  birthDate: '',
  cpf: '',
  gender: '',
  phone: '',
  email: '',
  password: '',
  cep: '',
  numero: ''
});
  const validateForm = () => {
  let isValid = true;
  const newErrors = {...errors};

  if (!name) {
    newErrors.name = 'Nome é obrigatório';
    isValid = false;
  } else {
    newErrors.name = '';
  }

  if (!birthDate) {
    newErrors.birthDate = 'Data de nascimento é obrigatória';
    isValid = false;
  } else {
    newErrors.birthDate = '';
  }

  if (!cpf) {
    newErrors.cpf = 'CPF é obrigatório';
    isValid = false;
  } else if (!isValidCPF(cpf)) {
    newErrors.cpf = 'CPF inválido';
    isValid = false;
  } else {
    newErrors.cpf = '';
  }
  if (!gender) {
  newErrors.gender = 'Identidade de gênero é obrigatória';
  isValid = false;
} else {
  newErrors.gender = '';
}

if (!phone) {
  newErrors.phone = 'Telefone é obrigatório';
  isValid = false;
} else if (!isValidPhone(phone)) {
  newErrors.phone = 'Telefone inválido';
  isValid = false;
} else {
  newErrors.phone = '';
}

if (!email) {
  newErrors.email = 'E-mail é obrigatório';
  isValid = false;
} else if (!isValidEmail(email)) {
  newErrors.email = 'E-mail inválido';
  isValid = false;
} else {
  newErrors.email = '';
}

if (!password) {
  newErrors.password = 'Senha é obrigatória';
  isValid = false;
} else if (!isValidPassword(password)) {
  newErrors.password = 'Senha deve ter ao menos 6 caracteres';
  isValid = false;
} else {
  newErrors.password = '';
}

if (!cep) {
  newErrors.cep = 'CEP é obrigatório';
  isValid = false;
} else {
  newErrors.cep = '';
}

if (!numero) {
  newErrors.numero = 'Número é obrigatório';
  isValid = false;
} else {
  newErrors.numero = '';
}

  // Continue para os outros campos...

  setErrors(newErrors);
  return isValid;
};


  const handleSignUp = () => {
  if (validateForm()) {
    navigation.navigate('Login');
  }
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
  const genderItem = [
    { key: 'cism', value: 'Homem cisgênero' },
    { key: 'cisf', value: 'Mulher cisgênero' },
    { key: 'transm', value: 'Homem transgênero' },
    { key: 'transf', value: 'Mulher transgênero' },
    { key: 'nbin', value: 'Não-binário' },
    { key: 'travest', value: 'Travesti' },
    { key: 'naodizer', value: 'Prefiro não dizer' }
  ];
  const enderecoCompleto = `${endereco}${numero ? ', ' + numero : ''}${bairro ? ' - ' + bairro : ''}${cidade ? ', ' + cidade : ''}${uf ? '/' + uf : ''}`;
  const inputFields = [
    {
      placeholder: 'Nome',
      key: 'name',
      icon: <User color="#3386BC" size={20} />,
      fullWidth: true,
      value: name,
      onChangeText: setName,
      error: errors.name 
    },
    {
      placeholder: 'Data de nascimento',
      key: 'birthDate',
      keyboardType: 'numeric',
      icon: <Calendar color="#3386BC" size={20} />,
      maxLength: 10,
      value: birthDate,
      onChangeText: (text) => {
        let cleanedText = text.replace(/\D/g, '');
        if (cleanedText.length > 4) {
          cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}/${cleanedText.slice(4, 8)}`;
        } else if (cleanedText.length > 2) {
          cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
        }
        setBirthDate(cleanedText);
      },
      error: errors.birthDate 
    },
    {
      placeholder: 'CPF',
      key: 'cpf',
      icon: <IdCard color="#3386BC" size={20} />,
      keyboardType: 'numeric',
      maxLength: 14,
      value: cpf,
      onChangeText: (text) => {
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
      },
      error: errors.cpf 
    },
    {
  key: 'genderPicker',
  render: () => (
    <View style={{ width: '100%', marginBottom: 10 }}>
      <View style={errors.gender ? { borderColor: 'red', borderWidth: 1, borderRadius: 20 } : null}>
        <SelectList
          setSelected={(val) => setGender(val)}
          data={genderItem}
          save="value"
          placeholder='Selecione a identidade de gênero'
          boxStyles={{ 
            backgroundColor: '#ffffff', 
            borderRadius: 20, 
            width: '100%', 
            marginBottom: 0, 
            borderWidth: 0 
          }}
          search={false}
          dropdownTextStyles={{ color: '#3386bc' }}
          inputStyles={{ color: '#3386bc', fontSize: 16 }}
          dropdownStyles={{ backgroundColor: '#ffffff', marginTop: 5, borderRadius: 20, borderWidth: 0 }}
        />
      </View>
      {errors.gender && (
        <>
          <XCircleIcon color="red" size={20} style={{ position: 'absolute', right: 15, top: 15 }} />
          <Text style={{color: 'red',
  fontSize: 14,
marginBottom:-15,
  top: 5,
  marginLeft: 10,
  alignSelf: 'flex-start',
  width: '100%'}}>{errors.gender}</Text>
        </>
      )}
    </View>
  )
},
    {
      placeholder: 'Telefone',
      key: 'phone',
      icon: <Phone color="#3386BC" size={20} />,
      keyboardType: 'numeric',
      fullWidth: true,
      value: phone,
      onChangeText: (text) => {
        let cleaned = text.replace(/\D/g, ''); // Remove tudo que não for número

        if (cleaned.length <= 2) {
          // Apenas DDD
          setPhone(`(${cleaned}`);
        } else if (cleaned.length <= 6) {
          // DDD + começo do número
          setPhone(`(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`);
        } else if (cleaned.length <= 10) {
          // Número fixo: (11) 1234-5678
          setPhone(`(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`);
        } else {
          // Celular com 9 dígitos: (11) 91234-5678
          setPhone(`(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`);
        }
      },
      error: errors.phone 

    },
    {
      placeholder: 'Endereço de e-mail',
      key: 'email',
      icon: <Mail color="#3386BC" size={20} />,
      fullWidth: true,
      value: email,
      onChangeText: setEmail,
      error: errors.email 
    },
    {
      placeholder: 'Senha',
      key: 'password',
      icon: <Lock color="#3386BC" size={20} />,
      secure: true,
      fullWidth: true,
      value: password,
      onChangeText: setPassword,
      error: errors.password 
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
          onChangeText: (text) => {
            setCep(text);
            if (text.length === 8) chamarCep(text);
          },
          error: errors.cep 
        },
        {
          placeholder: 'Nº',
          key: 'addressNumber',
          icon: <Binary color="#3386BC" size={20} />,
          keyboardType: 'numeric',
          flex: 0.5,
          value: numero,
          onChangeText: setNumero,
          error: errors.numero 
        }
      ]
    },
    {
      placeholder: 'Endereço',
      key: 'address',
      icon: <MapPinHouse color="#3386BC" size={20} />,
      flex: 1.5,
      value: enderecoCompleto,
      editable: true,
      

    },
  ];
  async function chamarCep(cep) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
        timeout: 5000
      });
      const data = response.data;

      if (!data.erro) {
        setEndereco(data.logradouro || '');
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setUf(data.uf || '');
      } else {
        console.log("CEP não encontrado");
      }
    } catch (error) {
      console.log("Erro ao buscar o CEP:", error.message);
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
          {inputFields.map((field) => (
  field.render ? (
    <View key={field.key} style={{ width: '85%', marginBottom: 5 }}>
      {field.render()}
      {errors[field.key] && <Text style={styles.errorText}>{errors[field.key]}</Text>}
    </View>
  ) : field.fields ? (
    <View key={field.key} style={styles.rowContainer}>
      {field.fields.map((subField) => (
        <View key={subField.key} style={{ flex: subField.flex || 1, marginHorizontal: 4 }}>
          <View style={[
            styles.inputWrapper,
            errors[subField.key] && styles.errorInputWrapper
          ]}>
            <View style={styles.iconContainer}>{subField.icon}</View>
            <TextInput
              placeholder={subField.placeholder}
              placeholderTextColor="#3386BC"
              style={styles.input}
              value={subField.value}
              onChangeText={(text) => {
                // Padronize para usar onChangeText em todos os campos
                if (subField.onChangeText) {
                  subField.onChangeText(text);
                } else if (subField.onChange) {
                  subField.onChange({ target: { value: text } }); // Converte para formato compatível
                }
                setErrors({...errors, [subField.key]: ''});
              }}
              keyboardType={subField.keyboardType}
              maxLength={subField.maxLength}
              secureTextEntry={subField.secure || false}
            />
            {errors[subField.key] && (
              <XCircleIcon color="red" size={20} style={styles.errorIcon} />
            )}
          </View>
          {errors[subField.key] && <Text style={styles.errorText}>{errors[subField.key]}</Text>}
        </View>
      ))}
    </View>
  ) : (
    <View key={field.key} style={{ width: '85%', marginBottom: 5 }}>
      <View style={[
        styles.inputWrapper,
        errors[field.key] && styles.errorInputWrapper
      ]}>
        <View style={styles.iconContainer}>{field.icon}</View>
        <TextInput
          placeholder={field.placeholder}
          placeholderTextColor="#3386BC"
          style={styles.input}
          value={field.value}
          onChangeText={(text) => {
            // Padronize para usar onChangeText em todos os campos
            if (field.onChangeText) {
              field.onChangeText(text);
            } else if (field.onChange) {
              field.onChange({ target: { value: text } }); // Converte para formato compatível
            }
            setErrors({...errors, [field.key]: ''});
          }}
          keyboardType={field.keyboardType}
          maxLength={field.maxLength}
          secureTextEntry={field.secure || false}
          editable={field.editable !== false}
        />
        {errors[field.key] && (
          <XCircleIcon color="red" size={20} style={styles.errorIcon} />
        )}
      </View>
      {errors[field.key] && <Text style={styles.errorText}>{errors[field.key]}</Text>}
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Inscreva-se</Text>
            </TouchableOpacity>
          </View>
          <View style={{ top: 30, flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 14, bottom: 15 }}>Você tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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

