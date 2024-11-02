import { router, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
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
    }

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setEmail("");
    setPassword("");
    setErrorLogin("");
    router.push("/internas/tasks");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorLogin(errorMessage);
  });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')} />

            {errorLogin != null && (
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

            <TouchableOpacity style={styles.button}
                onPress={validarCampos}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => router.push('/user_create')}
            >
                <Text style={styles.buttonCreateText}>Criar Usuário</Text>
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
        width: '100%'
    },
    logo: {
        marginBottom: 3,
    },
    alert: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
    fontSize: 18,
    borderRadius: 40, // Bordas arredondadas
    backgroundColor: '#FFF',
    padding: 8, // Reduz o padding para um tamanho menor
    marginBottom: 20,
    width: '100%', // Reduz a largura da caixa de texto
    borderWidth: 1, // Adiciona uma borda fina
    borderColor: '#DDD', // Define uma cor suave para a borda
    textAlign: 'center',
    },

    button: {
        backgroundColor: '#000062',
        padding: 10,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        width: '50%',
        marginBottom: 19 // Espaçamento entre os botões
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    buttonCreate: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 40,
        width: '50%'
    },
    buttonCreateText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    }
})