import { useFocusEffect,useNavigation } from "@react-navigation/native";

import React from "react";
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import LinearGradient from "react-native-linear-gradient";

const Inicial = () => {
    const navigator = useNavigation();
   useFocusEffect(
             React.useCallback(() => {
               StatusBar.setBackgroundColor('#B8E4C9');
             }, [])
           );

    return (
        <LinearGradient
        colors={["#B8E4C9", "#A3D8F4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground} >
    
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
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    gradientBackground:{
        flex:1
    },
    principal: {
        backgroundColor: 'transparent',
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
    borderWidth:0.5
       

    },
    buttonAcess: {
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
    borderWidth:0.5
       

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