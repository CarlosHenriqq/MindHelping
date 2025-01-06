import React from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Text, Image } from 'react-native';

const Chat = () => {
    return (
        <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100} // Ajuste conforme necessário para o cabeçalho
        >
            <View style={styles.chatHeader}>
                <Image
                    source={require('../../../assets/img/seta.png')}
                    style={styles.imagemSetaHeader}
                />
                <Text style={styles.textHeader}>CHAT</Text>
                <Image
                    source={require('../../../assets/img/perfil_nav.png')}
                    style={styles.perfilHeader}
                />
            </View>

            {/* Área de mensagens - use uma ScrollView se precisar */}
            <View style={styles.chatArea}>
                {/* Aqui você pode adicionar componentes de mensagens ou outros conteúdos */}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Digite sua mensagem'
                    style={styles.inputChat}
                />
                <Image
                 source={require('../../../assets/img/chat_icon/send.png')}
                 style={styles.imagemEnviar}/>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Chat;

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
    },
    chatHeader: {
        backgroundColor: '#A3D8F4',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imagemSetaHeader: {
        width: 20,
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 10,
        transform: [{ scaleX: -1 }],
    },
    perfilHeader: {
        width: 30,
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight:10
    },
    textHeader: {
        marginHorizontal: 10,
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
    },
    chatArea: {
        flex: 1, // Isso permite que a área de chat ocupe o espaço restante
        backgroundColor: '#f0f0f0', // Cor de fundo para a área de chat (opcional)
    },
    inputContainer: {
       padding:10,
        backgroundColor: '#ffffff', // Cor de fundo do input
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    inputChat: {
        borderRadius: 8,
        borderWidth: 2,
        width:'90%',
        height: 40,
        borderColor: '#ccc', // Cor da borda
        paddingHorizontal: 10, // Espaçamento interno horizontal
    },
    imagemEnviar:{
width:30,
height:30
    }
});
