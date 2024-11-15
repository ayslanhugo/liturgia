import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { auth, db } from '../../scripts/firebase-config';
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
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          nome: nome,
          email: email,
        });
        router.push('/'); // Redireciona para a tela inicial
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorCreateUser(errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Image style={styles.logo} source={require('../../assets/images/logo.png')} />

        {errorCreateUser != null && (
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

        <TouchableOpacity style={styles.button} onPress={validarCampos}>
          <Text style={styles.textButton}>Criar Conta</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 20,
    width: 400, // Ajuste o tamanho conforme necessário
    height: 400, // Ajuste o tamanho conforme necessário
  },
  titulo: {
    color: "#fff",
    fontSize: 32,
    marginBottom: 50,
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
});
