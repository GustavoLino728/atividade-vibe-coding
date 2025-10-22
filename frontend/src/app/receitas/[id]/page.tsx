'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { receitasAPI } from '@/services/api';
import { Receita } from '@/types/receita';
import RecipeDetail from '@/components/RecipeDetail';
import Loading from '@/components/Loading';
import Header from '@/components/Header';

export default function ReceitaPage() {
  const router = useRouter();
  const params = useParams();
  const [receita, setReceita] = useState<Receita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceita = async () => {
      try {
        setLoading(true);
        const id = parseInt(params.id as string);
        const data = await receitasAPI.getReceitaPorId(id);
        setReceita(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar receita');
        console.error('Erro ao buscar receita:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReceita();
    }
  }, [params.id]);

  const handleClose = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Loading />
      </div>
    );
  }

  if (error || !receita) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Receita não encontrada
          </h2>
          <button
            onClick={handleClose}
            className="bg-primary hover:bg-primary-dark text-secondary px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Voltar para início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RecipeDetail receita={receita} onClose={handleClose} />
    </div>
  );
}