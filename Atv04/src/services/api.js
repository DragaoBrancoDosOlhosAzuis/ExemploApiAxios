import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'https://dog.ceo/api',
  timeout: 10000, // 10 segundos de timeout
});

// Serviço para buscar imagens de cachorros
export const dogsApi = {
  // Buscar uma imagem aleatória
  getRandomImage: async () => {
    try {
      const response = await api.get('/breeds/image/random');
      
      if (response.data.status === 'success') {
        return {
          success: true,
          imageUrl: response.data.message,
        };
      } else {
        return {
          success: false,
          error: 'Resposta inesperada da API',
        };
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      
      // Tratamento de diferentes tipos de erro
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          error: 'Tempo de conexão excedido. Verifique sua internet.',
        };
      } else if (error.response) {
        // Erro da API (status 4xx, 5xx)
        return {
          success: false,
          error: `Erro ${error.response.status}: ${error.response.data?.message || 'Erro na API'}`,
        };
      } else if (error.request) {
        // Erro de rede (sem resposta)
        return {
          success: false,
          error: 'Erro de conexão. Verifique sua internet.',
        };
      } else {
        // Outros erros
        return {
          success: false,
          error: 'Erro inesperado ao buscar imagem',
        };
      }
    }
  },

  // (Opcional) Buscar múltiplas imagens - para futuras expansões
  getMultipleRandomImages: async (count) => {
    try {
      const response = await api.get(`/breeds/image/random/${count}`);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          imageUrls: response.data.message,
        };
      } else {
        return {
          success: false,
          error: 'Resposta inesperada da API',
        };
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      return {
        success: false,
        error: 'Erro ao buscar imagens',
      };
    }
  },
};

export default api;