import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
    const navigation = useNavigation();

    const handleNavigateToHome = () => {
        navigation.navigate('TabNavigation'); 
    };

    return (
         <LinearGradient
                colors={["#B8E4C9", "#A3D8F4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground} >
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
                    placeholderTextColor="#6D6D6D"
                />
                <Text style={styles.texto}>Senha:</Text>
                <TextInput 
                    placeholder='Digite sua senha'
                    style={styles.input}
                    secureTextEntry={true} 
                    placeholderTextColor='#6D6D6D'
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
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientBackground:{
        flex:1
    },

    principal: {
        backgroundColor: "transparent",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagem: {
        width: '70%',
        maxHeight: '40%',
        marginBottom: 20,
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: '#ededed',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 2,
    },
    input: {
        height: 45,
        borderRadius: 8,
        borderColor: '#000000',
        width: '80%',
        paddingHorizontal: 15,
        borderWidth: 1,
        backgroundColor: '#FFF',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    texto: {
        fontSize: 18,
        color: '#333',
        alignSelf: 'flex-start',
        marginBottom: 8,
        marginTop: 5,
        paddingLeft: 45
    },
    textSenha: {
        color: '#555',
        fontStyle: 'italic',
    },
    senha: {
        alignItems: 'center',
        marginTop: 10,
    },
    textButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#ffffff',
        height: 45,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#000000',
        borderWidth: 1,
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Login;
