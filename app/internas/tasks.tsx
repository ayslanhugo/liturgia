import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tasks() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>30ª Semana do Tempo Comum | Sexta-feira</Text>
            <Text style={styles.text}>Primeira Leitura (Fl 1,1-11)</Text>
            <Text style={styles.task}>Início da Carta de São Paulo aos Filipenses</Text>
            <Text style={styles.task}>Paulo e Timóteo, servos de Cristo Jesus, a todos os santos em Cristo Jesus que estão em Filipos, com os seus bispos e diáconos: 2 graça e paz a vós da parte de Deus nosso Pai e do Senhor Jesus Cristo. 3 Dou graças ao meu Deus, todas as vezes que me lembro de vós. 4 Sempre em todas as minhas orações rezo por vós, com alegria, 5 por causa da vossa comunhão conosco na divulgação do evangelho, desde o primeiro dia até agora. 6 Tenho a certeza de que aquele que começou em vós uma boa obra, há de levá-la à perfeição até ao dia de Cristo Jesus. 7 É justo que eu pense assim a respeito de vós todos, pois a todos trago no coração, porque, tanto na minha prisão como na defesa e confirmação do Evangelho, participais na graça que me foi dada. 8 Deus é testemunha de que tenho saudade de todos vós, com a ternura de Cristo Jesus. 9 E isto eu peço a Deus: que o vosso amor cresça sempre mais, em todo o conhecimento e experiência, 10 para discernirdes o que é o melhor. E assim ficareis puros e sem defeito para o dia de Cristo, 11 cheios do fruto da justiça que nos vem por Jesus Cristo, para a glória e o louvor de Deus.</Text>
            <Text style={styles.task}> Palavra do Senhor.
                - Graças a Deus.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    task: {
        fontSize: 16,
        marginVertical: 5,
    },
});
