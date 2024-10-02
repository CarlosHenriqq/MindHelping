import React, { useRef, useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';

const Diario = () => {
    // Referências para os TextInput
    const inputRefs = Array.from({ length: 13 }, () => useRef(null));

    // Limite de caracteres
    const CHAR_LIMIT = 45;

    // Estado para armazenar o conteúdo dos campos
    const [inputs, setInputs] = useState(Array(13).fill(''));
    // Estado para armazenar o conteúdo anterior antes de limpar
    const [previousInputs, setPreviousInputs] = useState([]);

    const handleChangeText = (text, index) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = text;
        setInputs(updatedInputs);

        if (text.length >= CHAR_LIMIT) {
            // Mover o foco para o próximo input se houver
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.length) {
                inputRefs[nextIndex].current.focus();
            }
        }
    };

    const handleNextPage = () => {
        // Salvar o conteúdo atual antes de limpar
        setPreviousInputs(inputs);

        // Limpar os campos de entrada
        setInputs(Array(13).fill(''));
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>
                    MEU DIÁRIO
                </Text>
                <View style={styles.containerDiario}>
                    {inputRefs.map((ref, index) => (
                        <TextInput
                            key={index}
                            ref={ref}
                            style={styles.diario}
                            maxLength={CHAR_LIMIT} // Limite de caracteres por campo
                            onChangeText={(text) => handleChangeText(text, index)}
                            value={inputs[index]} // Valor controlado
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.botao} onPress={handleNextPage}>
                    <Text style={styles.textBotao}>PRÓXIMA PÁGINA</Text>
                </TouchableOpacity>
                {/* Exemplo de exibição do conteúdo salvo */}
                {previousInputs.length > 0 && (
                    <View style={styles.previousContent}>
                        <Text style={styles.previousTitle}>Conteúdo Anterior:</Text>
                        {previousInputs.map((text, index) => (
                            <Text key={index}>{text}</Text>
                        ))}
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Diario;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16, // Ajuste conforme necessário
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    containerDiario: {
        flexDirection: 'column', // Alinha os inputs verticalmente
        alignItems: 'stretch', // Faz com que os inputs ocupem toda a largura disponível
        borderWidth: 2,
        borderRadius: 9
    },
    diario: {
        borderWidth: 2,
        height: 40, // Ajuste a altura conforme necessário
        borderRadius: 2,
        paddingHorizontal: 10, // Adiciona espaço interno horizontal
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 'auto',
        height: 'auto'
    },
    textBotao: {
        fontWeight: 'bold'
    },
    previousContent: {
        marginTop: 20,
    },
    previousTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    }
});
