import { useFocusEffect,useNavigation } from "@react-navigation/native";

import React from "react";
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

const Inicial = () => {
    const navigator = useNavigation();
    useFocusEffect(
        React.useCallback(() => {
          StatusBar.setBackgroundColor('#A7BED3');
        }, [])
      );

    return (
        <KeyboardAvoidingView style={styles.principal} behavior="padding">
            <Animatable.Image
                animation="flipInY" duration={1000}
                source={require('../../../assets/img/logo.png')}
                style={styles.imagem}
                resizeMode='contain'
            />
            <Animatable.View style={styles.textButtonContainer}>
                <TouchableOpacity onPress={() => navigator.navigate('SignUp')} style={styles.button}>
                    <Text style={styles.newUser}>NOVO USUÁRIO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigator.navigate('Login')} >
                    <Text style={styles.buttonText}>ACESSAR</Text>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    principal: {
        backgroundColor: "#f0f0f0",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagem: {
        width: '50%',
        maxHeight: '50%',
        marginBottom: 30,
        marginTop: 0,

    },
    textButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '75%',
        marginBottom: 20,
        alignItems: 'center',
    
        marginTop: 135,
    },
    button: {
        borderRadius: 15,
       
        height: 40,
        width: 270,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#000000',
        borderWidth: 2,

    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        
    },
    newUser: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16
    },
})
export default Inicial;