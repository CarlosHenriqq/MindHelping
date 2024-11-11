import { useFocusEffect,useNavigation } from "@react-navigation/native";

import React from "react";
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

const Inicial = () => {
    const navigator = useNavigation();
    useFocusEffect(
        React.useCallback(() => {
          StatusBar.setBackgroundColor('#808f82');
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
                <TouchableOpacity onPress={() => navigator.navigate('Login')} style={styles.buttonAcess}>
                    <Text style={styles.buttonText}>ACESSAR</Text>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    principal: {
        backgroundColor: "#808f82",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagem: {
        width: '80%',
        maxHeight: '60%',
        bottom: 60,
        marginTop: 0,
        alignItems:'center'

    },
    textButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '75%',
        marginBottom: 20,
        alignItems: 'center',
    
        marginTop: 0,
    },
    button: {
        borderRadius: 15,
       backgroundColor:'#EDEDED',
        height: 40,
        width: 270,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderWidth:1
       

    },
    buttonAcess: {
        borderRadius: 15,
       backgroundColor:'#EDEDED',
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderWidth:1
       

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