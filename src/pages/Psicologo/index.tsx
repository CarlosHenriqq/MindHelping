import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from "react-native";

const Psico = () => {
    const [state, setState] = useState('');
    const [showInfo, setInfo] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [hideInfo, setHideInfo] = useState(false);

    const handlePress = () => {
        if (state.trim() !== '' && state.trim().length > 3) {
            setInfo(true);
            setSearchText(state);
            setHideInfo(true);
        } else {
            Alert.alert('Não conseguimos encontrar nenhum profissional com esse nome.');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setInfo(false);
            setSearchText('');
            setState('');
            setHideInfo(false);
            StatusBar.setBackgroundColor('#808F82')
        }, []
       
            )
    );

    return (
        <ScrollView style={styles.container}>
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
                
            </View>
            {!hideInfo && (
                <View>
                <Text style={styles.headerText}>Profissionais mais procurados:</Text>
                <View style={styles.professionalCard}>
                        <View style={styles.professionalInfo}>
                            <Image
                                source={require('../../../assets/img/perfil.png')}
                                style={styles.profileImage}
                            />
                            <View style={styles.professionalDetails}>
                                <Text style={styles.professionalName}>Dr(a). {searchText}</Text>
                                <Text style={styles.professionalRole}>Psicóloga Clínica</Text>
                                <Text>Telefone: (18) 99185-5010</Text>
                                <Text>Email: {searchText.toLowerCase()}@email.com</Text>
                                <Text>Endereço: Rua Exemplo, 123, Cidade - SP</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.professionalCard}>
                        <View style={styles.professionalInfo}>
                            <Image
                                source={require('../../../assets/img/perfil.png')}
                                style={styles.profileImage}
                            />
                            <View style={styles.professionalDetails}>
                                <Text style={styles.professionalName}>Dr(a). {searchText}</Text>
                                <Text style={styles.professionalRole}>Psicóloga Clínica</Text>
                                <Text>Telefone: (18) 99185-5010</Text>
                                <Text>Email: {searchText.toLowerCase()}@email.com</Text>
                                <Text>Endereço: Rua Exemplo, 123, Cidade - SP</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.professionalCard}>
                        <View style={styles.professionalInfo}>
                            <Image
                                source={require('../../../assets/img/perfil.png')}
                                style={styles.profileImage}
                            />
                            <View style={styles.professionalDetails}>
                                <Text style={styles.professionalName}>Dr(a). {searchText}</Text>
                                <Text style={styles.professionalRole}>Psicóloga Clínica</Text>
                                <Text>Telefone: (18) 99185-5010</Text>
                                <Text>Email: {searchText.toLowerCase()}@email.com</Text>
                                <Text>Endereço: Rua Exemplo, 123, Cidade - SP</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.professionalCard}>
                        <View style={styles.professionalInfo}>
                            <Image
                                source={require('../../../assets/img/perfil.png')}
                                style={styles.profileImage}
                            />
                            <View style={styles.professionalDetails}>
                                <Text style={styles.professionalName}>Dr(a). {searchText}</Text>
                                <Text style={styles.professionalRole}>Psicóloga Clínica</Text>
                                <Text>Telefone: (18) 99185-5010</Text>
                                <Text>Email: {searchText.toLowerCase()}@email.com</Text>
                                <Text>Endereço: Rua Exemplo, 123, Cidade - SP</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.professionalCard}>
                        <View style={styles.professionalInfo}>
                            <Image
                                source={require('../../../assets/img/perfil.png')}
                                style={styles.profileImage}
                            />
                            <View style={styles.professionalDetails}>
                                <Text style={styles.professionalName}>Dr(a). {searchText}</Text>
                                <Text style={styles.professionalRole}>Psicóloga Clínica</Text>
                                <Text>Telefone: (18) 99185-5010</Text>
                                <Text>Email: {searchText.toLowerCase()}@email.com</Text>
                                <Text>Endereço: Rua Exemplo, 123, Cidade - SP</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                
            )}
            

           

            {showInfo && (
                <View style={styles.showInfoContainer}>
                    <Text style={styles.showInfoText}>Profissionais com nome {"\n"}{searchText}</Text>
                    <View style={styles.professionalCard}>
                        <View style={styles.professionalInfo}>
                            <Image
                                source={require('../../../assets/img/perfil.png')}
                                style={styles.profileImage}
                            />
                            <View style={styles.professionalDetails}>
                                <Text style={styles.professionalName}>Dr(a). {searchText}</Text>
                                <Text style={styles.professionalRole}>Psicóloga Clínica</Text>
                                <Text>Telefone: (18) 99185-5010</Text>
                                <Text>Email: {searchText.toLowerCase()}@email.com</Text>
                                <Text>Endereço: Rua Exemplo, 123, Cidade - SP</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default Psico;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#FFF",
    },
    searchProfContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
    },
    searchProf: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 50,
        height: 50,
        marginRight: 10,
    },
    button: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -20 }],
        padding: 10,
        borderRadius: 20,
    },
    imageSearch: {
        width: 40,
        height: 40,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    showInfoContainer: {
        marginTop: 20,
        padding: 10,
    },
    showInfoText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    professionalCard: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 10,
     
        shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
    },
    professionalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    professionalDetails: {
        flex: 1,
    },
    professionalName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    professionalRole: {
        color: '#666',
        marginBottom: 5,
    },
});
