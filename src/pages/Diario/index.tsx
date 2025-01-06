import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Diario = () => {
    const navigation = useNavigation();
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBackgroundColor('#B8E4C9');
        }, [])
    );
        
    
    // Referências para os TextInput
    const inputRefs = Array.from({ length: 13 }, () => useRef(null));

    // Limite de caracteres
    const CHAR_LIMIT = 45;

    // Estado para armazenar as páginas e o índice da página atual
    const [pages, setPages] = useState([Array(13).fill('')]); // Inicializa com a primeira página vazia
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    // Estado para controlar a visualização do diário ou da lista de dias
    const [isWriting, setIsWriting] = useState(false);

    // Lista de entradas
    const [entries, setEntries] = useState([]);

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

    const handleNewEntry = () => {
        // Criar uma nova página de diário
        setIsWriting(true);
        setPages([...pages, Array(13).fill('')]);
        setCurrentPageIndex(pages.length);
    };

    const handleSelectEntry = (index) => {
        // Abrir o diário na entrada selecionada
        setCurrentPageIndex(index);
        setIsWriting(true);
    };

    const handleGoBack = () => {
        // Retornar à lista de entradas
        setIsWriting(false);
    };

    const saveEntry = () => {
        const currentPageContent = pages[currentPageIndex];

        // Verifica se há algum conteúdo na página atual
        const hasContent = currentPageContent.some((text) => text.trim() !== "");

        if (!hasContent) {
            // Se não houver conteúdo, não cria uma nova entrada
            return;
        }

        // Usa a primeira linha como prévia
        const preview = currentPageContent[0] || "";

        const newEntry = {
            date: new Date().toLocaleDateString('pt-BR'), // Formato de data brasileiro
            id: String(entries.length + 1), // Gerar um ID único
            preview: preview || 'Sem conteúdo', // Usa a primeira linha como preview
            content: currentPageContent, // Conteúdo completo da página
        };

        const updatedEntries = [...entries, newEntry]; // Adiciona a nova entrada
        setEntries(updatedEntries); // Atualiza a lista de entradas

        handleGoBack(); // Voltar para a tela de visualização
    };

   
    return (
        <View style={styles.containerDiarioView}>
            
                {isWriting ? (
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            <View style={styles.Seta}>
                                <TouchableOpacity onPress={() => {
                                    saveEntry();
                                    handleGoBack();
                                }} style={styles.botaoVoltar}>
                                    <Image
                                        source={require('../../../assets/img/seta.png')}
                                        style={styles.imagemSetaHeader}
                                    />
                                </TouchableOpacity>
                            </View>


                            <Text style={styles.headerTitle}>Diário</Text>



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
                ) : (
                    <View style={styles.entryListContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.botaoVoltar}>
                            <Image
                                source={require('../../../assets/img/seta.png')}
                                style={styles.imagemSetaHeader}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Diário</Text>
                        <View style={styles.listContainer}>
                            <FlatList
                                data={entries}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.entryItem}>
                                        <View style={styles.entryContent}>
                                            <Text style={styles.entryText}>{item.date}</Text>
                                            <Text style={styles.previewText}>{item.preview}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => { /* função de deletar aqui */ }}>
                                            <Image
                                                source={require('../../../assets/img/lixeira.png')}
                                                style={styles.lixeira}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                            <TouchableOpacity style={styles.addButton} onPress={handleNewEntry}>
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
           
        </View>
    );
};

export default Diario;




const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1
    },
    headerContainer: {
        height: 100, // Ajuste conforme necessário para ocupar a área verde
        backgroundColor: '#B8E4C9', // Caso queira usar apenas uma cor sólida
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff", // Cor do texto no cabeçalho
    },

    containerDiarioView: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    Seta: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
    },
    Title: {
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    botaoVoltar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagemSetaHeader: {
        width: 20,
        height: 20,
        marginBottom: 10,
        marginRight: 5,
        marginLeft: 10,
        transform: [{ scaleX: -1 }],
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
        color: '#000000',
        top: 20,
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
    entryListContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
        padding: 16,
        backgroundColor: '#B8E4C9',
    },
    listContainer: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 55,
    },
    entryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#000000',
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
    },
    entryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    previewText: {
        fontSize: 14,
        color: '#666',
    },
    addButton: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    botoes: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 30,
    },
    lixeira: {
        width: 24,
        height: 24,
        marginLeft: 15,
    },
    entryContent: {
        flex: 1,
    },
});
