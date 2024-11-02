import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from '../scripts/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function CreateUser() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCreateUser, setErrorCreateUser] = useState("");

    const validarCampos = () => {
        if (nome == "") {
            setErrorCreateUser("Informe seu nome");
        } else if (email == "") {
            setErrorCreateUser("Informe seu email");
        } else if (password == "") {
            setErrorCreateUser("Informe uma senha");
        } else {
            setErrorCreateUser("");
            createUser();
        }
    }

    const createUser = () => {
        console.log("CCC")
        // Função que cria o usuario no Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Testeddd")
                // Signed up 
                const user = userCredential.user;
                set(ref(db,'users/' + user.uid),{
                    nome: nome,
                    email: email
                });
                router.push('/');            
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorCreateUser(errorMessage);
                // ..
            });
    }

    
    return (
        <View style={styles.container}>

            { errorCreateUser != null && (
                <Text style={styles.alert}>{errorCreateUser}</Text>
            )} 

            <Text style={styles.titulo}>Cadastrar Usuário</Text>

            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validarCampos}
            >
                <Text style={styles.textButton}>Criar usuário</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
        titulo: {
            color: "#fff",
            fontSize: 32,
            marginBottom: 50
        },
        container: {
            backgroundColor: "#000062",
            padding: 50,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        },
        alert: {
            fontSize: 18,
            textAlign: 'center',
            color: '#FFF',
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
        }
    });