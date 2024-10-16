import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';

const Psico = () => {
    const [state, setState] = useState('');
    const [showInfo, setInfo] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [hideInfo, setHideInfo] = useState(false); // Adiciona a lógica para esconder informações

    const handlePress = () => {
        if (state.trim() !== '') { // Verifica se o input não está vazio
            console.log('Texto digitado: ', state);  
            setInfo(true); // Muda o estado para exibir a View
            setSearchText(state);
            setHideInfo(true); // Esconde a busca quando o botão é pressionado
        } else {
            Alert.alert('Não conseguimos encontrar nenhum profissional com esse nome.');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setInfo(false);
            setSearchText('');
            setState('');
            setHideInfo(false); // Reseta o estado quando a tela é focada
        }, [])
    );

    return (
        <View style={styles.container}>
          
                <View style={styles.searchProfContainer}>
                    <TextInput
                        placeholder="Busque por um profissional"
                        style={styles.searchProf}
                        value={state}
                        onChangeText={text => setState(text)}
                    />
                    <TouchableOpacity onPress={handlePress} style={styles.button}>
                        <Image
                            source={require('../../../assets/img/prof_icons/search.png')}
                            style={styles.imageSearch}
                        />
                    </TouchableOpacity>
                   {!hideInfo && (  // aqui ele mostra o conteudo antes de alguem buscar, por exemplo os profissionais mais procurados, 
                                                                        //ai se pesquisar algum especifico as informações some da tela*/
                    
                    <View>
                      
                        </View>
                 )}
                    
                </View>
                
                
            

            {showInfo &&  ( // Exibe informações se showInfo for verdadeiro e hideInfo for verdadeiro
                <View style={styles.showInfoContainer}>
                    <Text style={styles.showInfoText}>Profissionais com nome {"\n"}{searchText}</Text>
                    <View>
                        <Text style={styles.showinfoProf}>{searchText} - Psicólogo {"\n"}
                            Telefone: (18) 991855010
                        </Text>
                        <Text style={styles.showinfoProf}>{searchText} - Psicólogo {"\n"}
                            Telefone: (18) 991855010
                        </Text>
                        <Text style={styles.showinfoProf}>{searchText} - Psicólogo {"\n"}
                            Telefone: (18) 991855010
                        </Text>
                        <Text style={styles.showinfoProf}>{searchText} - Psicólogo {"\n"}
                            Telefone: (18) 991855010
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Psico;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchProfContainer: {
        position: 'relative',
        padding: 10,
        justifyContent: 'center',
    },
    searchProf: {
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 50, // Adiciona espaço à direita para o ícone de lupa
        padding: 10,
        height: 50,
        width: '100%',
    },
    button: {
        position: 'absolute', // Mantém o botão no mesmo local do ícone
        right: 10, // Posiciona o botão/lupa à direita
        top: '50%',
        transform: [{ translateY: -20 }], // Centraliza verticalmente o botão
        padding: 10, // Adiciona espaçamento interno ao botão
        borderRadius: 20, // Deixa o botão arredondado
    },
    imageSearch: {
        width: 40,
        height: 40,
    },
    showInfoContainer: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    showInfoText: {
        fontSize: 18,
        margin: 10,
    },
    showinfoProf: {
        borderRadius: 15,
        borderWidth: 2,
        padding: 10,
        marginTop: 20,
    }
});
