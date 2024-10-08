import React, { useRef, useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';

const Diario = () => {
    // Referências para os TextInput
    const inputRefs = Array.from({ length: 13 }, () => useRef(null));

    // Limite de caracteres
    const CHAR_LIMIT = 45;

    // Estado para armazenar as páginas e o índice da página atual
    const [pages, setPages] = useState([Array(13).fill('')]); // Inicializa com a primeira página vazia
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const handleChangeText = (text, index) => {
        const updatedInputs = [...pages[currentPageIndex]];
        updatedInputs[index] = text;

        // Atualiza a página atual
        const updatedPages = [...pages];
        updatedPages[currentPageIndex] = updatedInputs;

        setPages(updatedPages);

        if (text.length >= CHAR_LIMIT) {
            // Mover o foco para o próximo input se houver
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.length) {
                inputRefs[nextIndex].current.focus();
            }
        }
    };

    const handleNextPage = () => {
        // Salvar a página atual antes de avançar
        const updatedPages = [...pages];

        // Verifica se já está na última página
        if (currentPageIndex === updatedPages.length - 1) {
            // Adiciona uma nova página vazia ao array de páginas
            updatedPages.push(Array(13).fill(''));
        }

        setPages(updatedPages);
        setCurrentPageIndex(currentPageIndex + 1); // Mover para a próxima página
    };

    const handlePreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1); // Voltar uma página
        }
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
                <Text style={styles.currentPageText}>Página Atual: {currentPageIndex + 1}</Text>
                <View style={styles.containerDiario}>
                    {inputRefs.map((ref, index) => (
                        <TextInput
                            key={index}
                            ref={ref}
                            style={styles.diario}
                            maxLength={CHAR_LIMIT} // Limite de caracteres por campo
                            onChangeText={(text) => handleChangeText(text, index)}
                            value={pages[currentPageIndex][index]} // Valor controlado para a página atual
                        />
                    ))}
                </View>
                
                <View style={styles.buttonContainer}>
                    
                    <TouchableOpacity style={styles.botao} onPress={handlePreviousPage}>
                        <Text style={styles.textBotao}>PÁGINA ANTERIOR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={handleNextPage}>
                        <Text style={styles.textBotao}>PRÓXIMA PÁGINA</Text>
                    </TouchableOpacity>
                </View>
                
                
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
        padding: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        
    },
    containerDiario: {
        flexDirection: 'column',
        alignItems: 'stretch',
        borderWidth: 2,
        borderRadius: 9,
    },
    diario: {
        borderBottomWidth: 2,
        height: 40,
        borderRadius: 1,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    textBotao: {
        fontWeight: 'bold',
    },
    currentPageText: {
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold',
    },
});
