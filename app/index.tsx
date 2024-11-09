// Importações necessárias do Expo Router, React, e Firebase para a criação da tela de login
import { router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { auth } from '../scripts/firebase-config';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

// Componente principal de login
export default function Index() {
    // Hook do roteador para navegação
    const router = useRouter();

    // Hooks de estado para armazenar o e-mail, senha e mensagem de erro
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    // Função para validar campos de e-mail e senha
    const validarCampos = () => {
        if (email == "") {
            // Caso o e-mail esteja vazio, define a mensagem de erro
            setErrorLogin("Informe seu e-mail");
        } else if (password == "") {
            // Caso a senha esteja vazia, define a mensagem de erro
            setErrorLogin("Informe sua senha");
        } else {
            // Caso ambos os campos estejam preenchidos, limpa o erro e tenta login
            setErrorLogin("");
            login();
        }
    };

    // Função de login utilizando o Firebase Authentication
    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Se o login for bem-sucedido, limpa os campos e redireciona o usuário
                const user = userCredential.user;
                setEmail("");
                setPassword("");
                setErrorLogin("");
                router.push("/internas/liturgia"); // Navega para a tela interna
            })
            .catch((error) => {
                // Em caso de erro, exibe a mensagem de erro no estado
                setErrorLogin(error.message);
            });
    };

    // Renderiza o layout da tela de login
    return (
        // Envolve o conteúdo em KeyboardAvoidingView para ajustar a interface ao abrir o teclado
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Define o comportamento para iOS e Android
            keyboardVerticalOffset={80} // Ajusta a posição vertical ao abrir o teclado
        >
            {/* ScrollView permite a rolagem do conteúdo caso o teclado ocupe muito espaço */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Logo da aplicação */}
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />

                {/* Exibe a mensagem de erro, caso exista */}
                {errorLogin && (
                    <Text style={styles.alert}>{errorLogin}</Text>
                )}

                {/* Campo de entrada para e-mail */}
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    value={email}
                    onChangeText={setEmail} // Atualiza o estado com o texto inserido
                    keyboardType="email-address" // Define o tipo de teclado para e-mail
                />

                {/* Campo de entrada para senha */}
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    secureTextEntry={true} // Esconde o texto digitado para senhas
                    value={password}
                    onChangeText={setPassword} // Atualiza o estado com a senha inserida
                />

                {/* Botão para acionar o login */}
                <TouchableOpacity style={styles.button} onPress={validarCampos}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>

                {/* Botão para navegar para a tela de cadastro */}
                <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('/user_create')}>
                    <Text style={styles.TextInicial}>Novo por aqui?</Text>
                    <Text style={styles.buttonCreateText}>Cadastre-se!</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// Estilos para a tela de login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000062", // Fundo azul escuro
    },
    scrollContainer: {
        padding: 80,
        alignItems: 'center',
        justifyContent: 'center', // Centraliza os elementos
    },
    logo: {
        marginBottom: 3,
        width: 400,
        height: 400, // Define tamanho da logo
    },
    alert: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20, // Espaçamento abaixo do alerta de erro
    },
    input: {
        fontSize: 18,
        borderRadius: 40, // Bordas arredondadas
        backgroundColor: '#FFF', // Fundo branco para o campo de entrada
        padding: 8,
        marginBottom: 20, // Espaçamento entre os campos
        width: '100%', // Ocupa toda a largura disponível
        borderWidth: 1,
        borderColor: '#DDD', // Borda leve
        textAlign: 'center', // Texto centralizado
    },
    button: {
        backgroundColor: '#f68529', // Cor de fundo laranja
        padding: 10,
        borderRadius: 40, // Bordas arredondadas
        borderColor: '#FFFFFF',
        width: '100%', // Ocupa toda a largura disponível
        marginBottom: 19, // Espaçamento abaixo do botão
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff', // Texto branco
    },
    buttonCreate: {
        padding: 10,
        borderColor: '#FFFFFF',
        borderRadius: 40,
        width: '50%', // Ocupa metade da largura
    },
    buttonCreateText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        textDecorationLine: 'underline', // Texto sublinhado
    },
    TextInicial: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    },
});