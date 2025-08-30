import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import DogsFinder from './src/components/DogsFinder'; // Ajuste o caminho conforme sua estrutura

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <DogsFinder />
    </SafeAreaView>
  );
};

export default App;