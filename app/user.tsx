import { useRouter } from 'expo-router';
import { auth } from '../scripts/firebase-config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

export default function User() {
    const router = useRouter();

    // State para armazenar as credenciais de login, erros e estado de autenticação
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    // Verifica o estado de autenticação do usuário
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUserLoggedIn(!!user);
            if (user) {
                router.push("../../checklist"); // Caminho correto após login
            }
        });
        return unsubscribe;
    }, [router]);

    // Função de login
    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                setErrorLogin("");
                router.push("../checklist"); // Caminho correto após login
            })
            .catch((error) => {
                setErrorLogin(error.message);
            });
    };

    // Função de logout
    const logout = () => {
        signOut(auth).then(() => {
            setUserLoggedIn(false); // Atualiza o estado para exibir a tela de login
            router.push("/user"); // Caminho correto
        }).catch((error) => {
            console.error("Erro ao sair: ", error.message);
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
        >
            {userLoggedIn ? (
                // Tela de dados do usuário quando logado
                <View style={styles.loggedInContainer}>
                    <Text style={styles.title}>Dados do Usuário</Text>
                    <Text style={styles.userInfo}>Email: {auth.currentUser?.email}</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // Tela de login quando não logado
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                    
                    {errorLogin && (
                        <Text style={styles.alert}>{errorLogin}</Text>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={login}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push("/internas/user_create")}> 
                        {/* Aponte para a tela de criação de usuário */}
                        <Text style={styles.TextInicial}>Novo por aqui?</Text>
                        <Text style={styles.buttonCreateText}>Cadastre-se!</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000062",
    },
    scrollContainer: {
        padding: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 3,
        width: 400,
        height: 400,
    },
    alert: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 40,
        backgroundColor: '#FFF',
        padding: 8,
        marginBottom: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: '#DDD',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#f68529',
        padding: 10,
        borderRadius: 40,
        borderColor: '#FFFFFF',
        width: '100%',
        marginBottom: 19,
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff',
    },
    buttonCreate: {
        padding: 10,
        borderColor: '#FFFFFF',
        borderRadius: 40,
        width: '50%',
    },
    buttonCreateText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        textDecorationLine: 'underline',
    },
    TextInicial: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    },
    loggedInContainer: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfo: {
        fontSize: 18,
        color: "#555",
        marginBottom: 40,
    },
    logoutButton: {
        backgroundColor: '#f68529',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    logoutText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});
