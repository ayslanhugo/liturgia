import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

type Practice = {
  name: string;
  days: { [key: string]: boolean }; // Armazena o estado da prática para cada dia da semana
};

const Checklist = () => {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [practiceInput, setPracticeInput] = useState<string>(''); // Para adicionar novas práticas

  // Dias da semana, agora incluindo Sábado e Domingo
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  // Função para adicionar uma nova prática espiritual
  const addPractice = () => {
    if (practiceInput.trim()) {
      const newPractice: Practice = {
        name: practiceInput,
        days: { Segunda: false, Terça: false, Quarta: false, Quinta: false, Sexta: false, Sábado: false, Domingo: false },
      };
      setPractices([...practices, newPractice]);
      setPracticeInput(''); // Limpa o campo de entrada
    }
  };

  // Função para marcar/desmarcar uma prática em um dia específico
  const togglePractice = (practiceIndex: number, day: string) => {
    const updatedPractices = [...practices];
    updatedPractices[practiceIndex].days[day] = !updatedPractices[practiceIndex].days[day];
    setPractices(updatedPractices);
  };

  // Função para resetar as práticas (apagar todas as práticas)
  const resetPractices = () => {
    setPractices([]);
  };

  // Função para limpar as anotações (limpar as marcações de todos os dias)
  const clearNotes = () => {
    const clearedPractices = practices.map(practice => ({
      ...practice,
      days: { Segunda: false, Terça: false, Quarta: false, Quinta: false, Sexta: false, Sábado: false, Domingo: false },
    }));
    setPractices(clearedPractices);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calendário Semanal de Práticas Espirituais</Text>

      {/* Campo para adicionar nova prática */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma prática espiritual"
          value={practiceInput}
          onChangeText={setPracticeInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPractice}>
          <Text style={styles.addButtonText}>Adicionar Prática</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de práticas espirituais */}
      {practices.map((practice, practiceIndex) => (
        <View key={practiceIndex} style={styles.practiceContainer}>
          <View style={styles.practiceHeader}>
            <Text style={styles.practiceName}>{practice.name}</Text>

            {/* Calendário semanal: Dias da semana ao lado da prática */}
            <View style={styles.calendarContainer}>
              {daysOfWeek.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    practice.days[day] && styles.completedDayCell,
                  ]}
                  onPress={() => togglePractice(practiceIndex, day)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      practice.days[day] && styles.completedDayText,
                    ]}
                  >
                    {day[0]} {/* Exibe apenas a primeira letra do dia */}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ))}

      {/* Botões de controle */}
      <View style={styles.buttonContainer}>
        {/* Botão para resetar todas as práticas (excluir tudo) */}
        <TouchableOpacity style={styles.resetButton} onPress={resetPractices}>
          <Text style={styles.resetButtonText}>Resetar Práticas</Text>
        </TouchableOpacity>

        {/* Botão para limpar as anotações (apenas desmarcar os dias) */}
        <TouchableOpacity style={styles.clearButton} onPress={clearNotes}>
          <Text style={styles.clearButtonText}>Limpar Anotações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#f68529',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  practiceContainer: {
    marginBottom: 30,
  },
  practiceHeader: {
    flexDirection: 'row', // Alinha o nome da prática e os dias na horizontal
    alignItems: 'center',
    marginBottom: 10,
  },
  practiceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20, // Espaço entre o nome da prática e os dias
  },
  calendarContainer: {
    flexDirection: 'row', // Dias da semana na horizontal
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  completedDayCell: {
    backgroundColor: '#4caf50',
  },
  dayText: {
    color: '#333',
    fontSize: 18,
  },
  completedDayText: {
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Checklist;
