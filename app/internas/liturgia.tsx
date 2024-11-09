import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';

interface Liturgia {
  data: string;
  liturgia: string;
  cor: string;
  oferendas: string;
  comunhao: string;
  primeiraLeitura: {
    referencia: string;
    titulo: string;
    texto: string;
  };
  segundaLeitura: {
    referencia: string;
    titulo: string;
    texto: string;
  } | string;
  salmo: {
    referencia: string;
    refrão: string;
    texto: string;
  };
  evangelho: {
    referencia: string;
    titulo: string;
    texto: string;
  };
  antifonas: {
    entrada: string;
    ofertorio: string;
    comunhao: string;
  };
}

interface TabContentProps {
  title: string;
  subtitle: string;
  content: string;
}

const fetchDailyReadings = async (): Promise<Liturgia | null> => {
  try {
    const response = await axios.get<Liturgia>('https://liturgia.up.railway.app/');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar leituras do dia", error);
    return null;
  }
};

const TabContent: React.FC<TabContentProps> = ({ title, subtitle, content }) => (
  <ScrollView contentContainerStyle={styles.tabContent}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.liturgia}>{content}</Text>
  </ScrollView>
);

const TabComponent = () => {
  const [index, setIndex] = useState(0);
  const [readings, setReadings] = useState<Liturgia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReadings = async () => {
      const data = await fetchDailyReadings();
      setReadings(data);
      setLoading(false);
    };
    loadReadings();
  }, []);

  const routes = [
    { key: 'primeira', title: '1ª Leitura' },
    { key: 'salmo', title: 'Salmo' },
    readings?.segundaLeitura ? { key: 'segunda', title: '2ª Leitura' } : null,
    { key: 'evangelho', title: 'Evangelho' },
  ].filter(Boolean);

  const renderScene = SceneMap({
    primeira: () => readings && (
      <TabContent title="1ª Leitura" subtitle="Primeira Leitura" content={`${readings.primeiraLeitura.titulo}\n${readings.primeiraLeitura.texto}`} />
    ),
    salmo: () => readings && (
      <TabContent title="Salmo" subtitle="Responsório" content={`${readings.salmo.referencia}\n${readings.salmo.refrão}\n${readings.salmo.texto}`} />
    ),
    segunda: () => {
      const segunda = readings?.segundaLeitura;
      const segundaContent = typeof segunda === 'string' ? segunda : segunda ? `${segunda.titulo}\n${segunda.texto}` : '';
      return <TabContent title="2ª Leitura" subtitle="Segunda Leitura" content={segundaContent} />;
    },
    evangelho: () => readings && (
      <TabContent title="Evangelho" subtitle="Evangelho do Dia" content={`${readings.evangelho.titulo}\n${readings.evangelho.texto}`} />
    ),
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : readings ? (
        <>
          {/* Exibe a Data com cor diferente */}
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{readings.data}</Text>
          </View>

          {/* Conteúdo da liturgia com estilo separado */}
          <View style={styles.liturgiaContainer}>
            <Text style={styles.liturgia}>{readings.liturgia}</Text>
            <Text style={[styles.cor, { color: readings.cor === 'vermelho' ? '#dc3545' : '#6c757d' }]}>
              Cor: {readings.cor}
            </Text>
          </View>

          <TabView
            navigationState={{
              index,
              routes: routes,
            }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'blue', height: 4 }}
                style={{ backgroundColor: '#f8f9fa', elevation: 2 }}
                labelStyle={{ color: '#495057', fontWeight: 'bold' }}
                scrollEnabled
              />
            )}
          />
        </>
      ) : (
        <Text style={styles.errorMessage}>Não foi possível carregar as leituras. Tente novamente mais tarde.</Text>
      )}
    </View>
  );
};

export default TabComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#212160',
  },
  dataContainer: {
    marginBottom: 10,
  },
  data: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f8f9fa',
    textAlign: 'center',
  },
  liturgiaContainer: {
    marginBottom: 20,
  },
  liturgia: {
    fontSize: 22,
    marginVertical: 5,
    marginBottom: 20,
    fontStyle: 'italic',
    color: '#000000',
    textAlign: 'center',
  },
  cor: {
    fontSize: 18,
    marginBottom: 3,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  tabContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007bff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});