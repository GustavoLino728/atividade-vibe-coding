// src/hooks/useReceitas.ts
'use client';

import { useState, useCallback } from 'react';
import { receitasAPI } from '@/services/api';
import { Receita, ReceitasResponse, TipoReceita } from '@/types/receita';

export const useReceitas = () => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<ReceitasResponse['meta'] | null>(null);

  const fetchReceitas = useCallback(async (
    page: number = 1,
    limit: number = 12
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await receitasAPI.getTodasReceitas(page, limit);
      setReceitas(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar receitas');
      console.error('Erro ao buscar receitas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarReceitas = useCallback(async (
    query?: string,
    ingredientes?: string[],
    page: number = 1,
    limit: number = 12
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await receitasAPI.buscarReceitas(query, ingredientes, page, limit);
      setReceitas(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar receitas');
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filtrarReceitas = useCallback(async (
    tipo?: TipoReceita,
    query?: string,
    page: number = 1,
    limit: number = 12
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await receitasAPI.filtrarReceitas(tipo, query, page, limit);
      setReceitas(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || 'Erro ao filtrar receitas');
      console.error('Erro ao filtrar:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    receitas,
    loading,
    error,
    meta,
    fetchReceitas,
    buscarReceitas,
    filtrarReceitas,
  };
};