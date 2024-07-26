import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Login = () => {
    const navigation = useNavigation();

    const handleNavigateToHome = () => {
        navigation.navigate('Home'); 
    };
    useFocusEffect(
        React.useCallback(() => {
          StatusBar.setBackgroundColor('#F7E4FF');
        }, [])
      );

    return (
        <KeyboardAvoidingView style={styles.principal} behavior="padding">
            <Animatable.Image
                animation="zoomIn"
                duration={400}
                source={require('../../../assets/img/logo.png')}
                style={styles.imagem}
                resizeMode='contain'
            />
            <Animatable.View style={styles.inputContainer}>
                <Text style={styles.texto}>Login:</Text>
                <TextInput
                    placeholder='Digite seu email'
                    style={styles.input}
                    placeholderTextColor="#68327e"
                />
                <Text style={styles.texto}>Senha:</Text>
                <TextInput 
                    placeholder='Digite sua senha'
                    style={styles.input}
                    secureTextEntry={true} 
                    placeholderTextColor="#68327e"
                />
                <Animatable.View style={styles.textButtonContainer}>
                    <TouchableOpacity onPress={handleNavigateToHome} style={styles.button}>
                        <Text style={styles.buttonText}>ACESSAR</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.senha}>
                    <Text style={styles.textSenha}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                </Animatable.View>
            </Animatable.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    principal: {
        backgroundColor: "#F7E4FF",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagem: {
        width: '60%',
        maxHeight: '50%',
        marginBottom: 10,
        marginTop: 50
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '110%',
        paddingHorizontal: 20,
        paddingVertical: 2,
        color:'white',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        flex: 2
        
    },
    input: {
       
        borderRadius: 10,
        borderColor: '#68327e',
        width: '80%',
        paddingHorizontal: 10,
        borderWidth: 1,
       
        
    },
    texto: {
        fontSize: 20,
        color: '#68327e',
        
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginTop: 5,
        paddingLeft: 45
    },
    textSenha: {
        color: '#68327e',
        fontStyle: 'italic'
    },
    senha: {
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        textAlignVertical: 'auto',
        
    },
    textButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '77%',
        marginBottom: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        borderRadius: 20,
        backgroundColor:'#68327e',
        height: 40,
        width: 330,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#68327e',
        borderWidth: 1,
    },
    buttonText: {
        color: '#f5f5f5',
     
        fontSize: 18
    },
});

export default Login;
