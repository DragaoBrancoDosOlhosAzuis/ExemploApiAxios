import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { dogsApi } from '../services/api';

const DogsFinder = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState('1');

  const fetchRandomDogImage = async () => {
    // Validar se o número é válido
    const num = parseInt(numberOfImages);
    if (isNaN(num) || num < 1) {
      Alert.alert('Erro', 'Por favor, insira um número válido maior que 0');
      return;
    }

    setLoading(true);
    
    try {
      const result = await dogsApi.getRandomImage();
      
      if (result.success) {
        setImageUrl(result.imageUrl);
      } else {
        Alert.alert('Erro', result.error || 'Não foi possível carregar a imagem');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = (text) => {
    // Permitir apenas números
    const numericValue = text.replace(/[^0-9]/g, '');
    setNumberOfImages(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐕 DogsFinder 🐕</Text>
      <Text style={styles.subtitle}>Encontre imagens fofas de cachorros!</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de imagens (sempre 1 no protótipo):</Text>
        <TextInput
          style={styles.input}
          value={numberOfImages}
          onChangeText={handleNumberChange}
          keyboardType="numeric"
          placeholder="1"
          editable={false}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={fetchRandomDogImage}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Buscar Cachorro 🐾</Text>
        )}
      </TouchableOpacity>

      {imageUrl && !loading && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={() => Alert.alert('Erro', 'Não foi possível carregar a imagem')}
          />
        </View>
      )}
    </View>
  );
};

// Mantenha os mesmos styles da implementação anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#ff6b35',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    maxWidth: 400,
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});

export default DogsFinder;