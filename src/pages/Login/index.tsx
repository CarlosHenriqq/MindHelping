import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, TextInput, KeyboardAvoidingView, 
    TouchableOpacity, Image, ImageBackground, ScrollView, Dimensions, Platform 
} from 'react-native';
import { User, LockKeyhole } from 'lucide-react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const navigation = useNavigation();
    const [toggleCheck, setToggleCheck] = useState(false);

    const handleNavigateToHome = () => {
        navigation.navigate('TabNavigation');
    };

    return (
        <ImageBackground
            source={require('../../../assets/img/gradiente.png')}
            style={styles.gradientBackground}
            blurRadius={20}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.principal} keyboardShouldPersistTaps="handled">
                    
                    <Image
                        source={require('../../../assets/img/logo.png')}
                        style={styles.imagem}
                        resizeMode='contain'
                    />
                    <Text style={styles.titulo}>FAÇA SEU LOGIN!</Text>

                    <View style={styles.inputContainer}>
                        <User color='#3386bC' size={20} style={styles.icon} />
                        <TextInput
                            placeholder='E-mail'
                            style={styles.input}
                            placeholderTextColor="#3386BC"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <LockKeyhole color='#3386bC' size={20} style={styles.icon} />
                        <TextInput
                            placeholder='Senha'
                            secureTextEntry
                            style={styles.input}
                            placeholderTextColor="#3386BC"
                        />
                    </View>

                    <View style={styles.optionsContainer}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={toggleCheck}
                                onValueChange={(newValue) => setToggleCheck(newValue)}
                                tintColors={{ true: '#ffffff', false: '#ffffff' }}
                                style={styles.check}
                            />
                            <Text style={styles.checkboxText}>Lembrar</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.textSenha}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleNavigateToHome} style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Não tem uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signupLink}>Inscreva-se</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        backgroundColor: '#3386BC',
    },
    principal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    imagem: {
        width: width * 1.0,
        height: '40%',
        marginBottom: 0,
    },
    titulo: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    inputContainer: {
        width: width * 0.85,
        marginBottom: 15,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 48,
        fontSize: 16,
        paddingLeft: 45,
        color: '#000',
    },
    icon: {
        position: 'absolute',
        left: 15,
        top: 13,
        zIndex: 1,
    },
    optionsContainer: {
        width: width * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    check: {
        width: 18,
        height: 18,
    },
    checkboxText: {
        color: 'white',
        fontSize: 14,
        marginLeft: width*0.03,
    },
    textSenha: {
        color: 'white',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#3D9CDA',
        borderRadius: 20,
        height: 44,
        width: width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    signupText: {
        color: 'white',
        fontSize: 14,
    },
    signupLink: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 0.5 },
        textShadowRadius: 2,
    },
});

export default Login;
