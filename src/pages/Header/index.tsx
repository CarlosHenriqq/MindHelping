import { useNavigation } from "@react-navigation/native";
import React from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Header = () =>{

    const navigator = useNavigation();
    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigator.navigate('Home')}>
            <Text style={styles.textHeader}>MINDHELPING</Text>
           </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigator.navigate('Login')}>
            <Image
           source={require('../../../assets/img/signOut.png')}
           style={styles.img2}
           />
           </TouchableOpacity>
        </View>
    )
}

export default  Header;

const styles = StyleSheet.create({

    header:{
        backgroundColor:'#9381FF',
        width:'100%',
        height:'7%',
        flexDirection:'row',
        
    },
    textHeader:{
        alignSelf:'flex-end',
        fontFamily:'robusto',
        margin:15,
        marginBottom:25,
        alignItems:'center',
        justifyContent:'center',
        width:'85%',
        fontWeight:'bold',
        textAlign:'center',
        color:'#000000'
        
    },
    img:{
        width:50,
        height:50,
        margin:5,
        marginLeft:15
    },
    img2:{
        width:30,
        height:30,
        margin:15,
        marginLeft:'75%'
    },
    
})