import { router, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { auth } from '../scripts/firebase-config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const validarCampos = () => {
        if (email == "") {
            setErrorLogin("Informe seu e-mail");
        } else if (password == "") {
            setErrorLogin("Informe sua senha");
        } else {
            setErrorLogin("");
            login();
        }
    };

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setEmail("");
                setPassword("");
                setErrorLogin("");
                router.push("/internas/liturgia");
            })
            .catch((error) => {
                setErrorLogin(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')} />

            {errorLogin && (
                <Text style={styles.alert}>{errorLogin}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={validarCampos}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('/user_create')}>
                <Text style={styles.TextInicial}>Novo por aqui?</Text>
                <Text style={styles.buttonCreateText}>Cadastre-se!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000062",
        padding: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        marginBottom: 3,
        width: 400,
        height: 400,
        borderWidth: 0,
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
        textDecorationLine: 'underline', // Aplique o sublinhado diretamente no texto
    },
    TextInicial: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    },
});

export default Index;