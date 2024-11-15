import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function about() {
    return (
        <View style={styles.container}>
            <Text>Sobre o app</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})