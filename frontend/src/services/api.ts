import axios from 'axios';
import { ReceitasResponse, Receita } from '@/types/receita';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const receitasAPI = {
  // Buscar todas as receitas
  getTodasReceitas: async (page: number = 1, limit: number = 10): Promise<ReceitasResponse> => {
    const response = await api.get('/receitas/todas', {
      params: { page, limit },
    });
    return response.data;
  },

  // Buscar receita por ID
  getReceitaPorId: async (id: number): Promise<Receita> => {
    const response = await api.get(`/receitas/${id}`);
    return response.data;
  },

  // Buscar receitas por tipo
  getReceitasPorTipo: async (tipo: string): Promise<ReceitasResponse> => {
    const response = await api.get(`/receitas/tipo/${tipo}`);
    return response.data;
  },

  // Buscar receitas (por nome ou ingredientes)
  buscarReceitas: async (
    query?: string,
    ingredientes?: string[],
    page: number = 1,
    limit: number = 10
  ): Promise<ReceitasResponse> => {
    const params: any = { page, limit };
    
    if (query) {
      params.q = query;
    }
    
    if (ingredientes && ingredientes.length > 0) {
      params.ingredientes = ingredientes.join(',');
    }
    
    const response = await api.get('/receitas/buscar', { params });
    return response.data;
  },

  // Filtrar receitas
  filtrarReceitas: async (
    tipo?: string,
    query?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ReceitasResponse> => {
    const params: any = { page, limit };
    
    if (tipo && tipo !== 'todas') {
      params.tipo = tipo;
    }
    
    if (query) {
      params.q = query;
    }
    
    const response = await api.get('/receitas/filtrar', { params });
    return response.data;
  },

  getIngredientes: async (receitaId: number): Promise<any> => {
    const response = await api.get(`/receitas/${receitaId}/ingredientes`);
    return response.data;
  },
};

export default api;