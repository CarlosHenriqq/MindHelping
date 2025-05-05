import { View } from "lucide-react-native";
import React, { useState } from "react"
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";




const FormRegister = () => {

     async function fetchAddressByCep(cep) {
        const cleanCep = cep.replace(/\D/g, '');

        if (cleanCep.length !== 8) {
            throw new Error('CEP inválido');
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await response.json();

            if (data.erro) {
                throw new Error('CEP não encontrado');
            }


            setEndereco: (data.logradouro);
            setBairro: (data.bairro);
            setCidade: (data.localidade);
            setUf: (data.uf);

        } catch (error) {
            throw new Error('Erro ao buscar o CEP');
        }
    }

    const [endereco, setEndereco] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')

    return (

        <View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Nome Completo'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>

            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Data de nascimento'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='CPF'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Identidade de gênero'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Telefone'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='E-mail'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Senha'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Repita a senha'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='CEP'
                    placeholderTextColor="#3386BC"
                    style={styles.input}
                    onChangeText={text=>{
                        if(text.length == 8 ){
                            fetchAddressByCep(text)
                        }
                    }} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Endereço'
                    placeholderTextColor="#3386BC"
                    style={styles.input}
                    value={endereco} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Nº'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Complemento'
                    placeholderTextColor="#3386BC"
                    style={styles.input} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Bairro'
                    placeholderTextColor="#3386BC"
                    style={styles.input} 
                    value={bairro}/>

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Cidade'
                    placeholderTextColor="#3386BC"
                    style={styles.input}
                    value={cidade} />

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='UF'
                    placeholderTextColor="#3386BC"
                    style={styles.input}
                    value={uf} />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {

        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#DDD',
        height: 46,
        marginBottom: 10
      },
      iconContainer: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
        paddingRight: 15,
    
      }
})

export default FormRegister;