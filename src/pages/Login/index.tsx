import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Login = () => {
    const navigation = useNavigation();

    const handleNavigateToHome = () => {
        navigation.navigate('TabNavigation'); 
    };
    useFocusEffect(
        React.useCallback(() => {
          StatusBar.setBackgroundColor('#A7BED3');
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
                    placeholderTextColor="#000000"
                />
                <Text style={styles.texto}>Senha:</Text>
                <TextInput 
                    placeholder='Digite sua senha'
                    style={styles.input}
                    secureTextEntry={true} 
                    placeholderTextColor='#000000'
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
        backgroundColor: "#A7BED3",
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
        backgroundColor:'white',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        flex: 2,
        
    },
    input: {
       height:40,
        borderRadius: 10,
        borderColor: '#000000',
        width: '80%',
        paddingHorizontal: 10,
        borderWidth: 1,
       backgroundColor:'#f1f1f1',
        fontWeight:'bold',
        alignItems:'center'
    },
    texto: {
        fontSize: 20,
        color: '#000000',
        
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginTop: 5,
        paddingLeft: 45
    },
    textSenha: {
        color: '#000000',
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
        backgroundColor:'#ffffff',
        height: 30,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#000000',
        borderWidth: 1,
    },
    buttonText: {
        color: '#000000',
        fontWeight:'bold',
        fontSize: 18
    },
});

export default Login;
