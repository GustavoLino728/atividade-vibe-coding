// src/components/RecipeList.tsx
'use client';

import React from 'react';
import { Receita } from '@/types/receita';
import RecipeCard from './RecipeCard';
import { useRouter } from 'next/navigation';

interface RecipeListProps {
  receitas: Receita[];
  loading?: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({ receitas, loading }) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
            <div className="w-full h-48 bg-gray-300" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!receitas || receitas.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-secondary mb-2">
          Nenhuma receita encontrada
        </h3>
        <p className="text-gray-600">
          Tente buscar com outros ingredientes ou filtros
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-6">
        Receitas Disponíveis
        <span className="text-base font-normal text-gray-600 ml-2">
          ({receitas.length} {receitas.length === 1 ? 'receita' : 'receitas'})
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {receitas.map((receita) => (
          <RecipeCard
            key={receita.id}
            receita={receita}
            onClick={(id) => router.push(`/receitas/${id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;