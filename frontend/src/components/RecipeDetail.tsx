// src/components/RecipeDetail.tsx
'use client';

import React from 'react';
import { Receita } from '@/types/receita';
import { Clock, ChefHat, X, Star } from 'lucide-react';
import Image from 'next/image';

interface RecipeDetailProps {
  receita: Receita;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ receita, onClose }) => {
  const getTipoLabel = (tipo: string) => {
    const labels: { [key: string]: string } = {
      'doce': 'Doce',
      'salgado': 'Salgado',
      'agridoce': 'Agridoce'
    };
    return labels[tipo] || tipo;
  };

  const ingredientesList = receita.ingredientes
    .split(/[,;]/)
    .map(i => i.trim())
    .filter(i => i.length > 0);

  const prepareSteps = receita.modo_preparo
    .split(/\d+\.|\n/)
    .map(step => step.trim())
    .filter(step => step.length > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {receita.link_imagem ? (
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={receita.link_imagem}
                alt={receita.receita}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
              <span className="text-8xl">🍽️</span>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-secondary" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                {receita.receita}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1 bg-primary px-3 py-1 rounded-full font-medium">
                  {getTipoLabel(receita.tipo)}
                </span>
              </div>
            </div>
            <Star className="text-primary fill-primary ml-4 flex-shrink-0" size={32} />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <ChefHat size={24} />
              Ingredientes
            </h2>
            <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
              {ingredientesList.map((ingrediente, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span className="text-secondary">{ingrediente}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <Clock size={24} />
              Modo de Preparo
            </h2>
            <ol className="space-y-4">
              {prepareSteps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-secondary font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-secondary flex-1 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {receita.IngredientesBase && receita.IngredientesBase.length > 0 && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-secondary mb-2">
                Ingredientes-chave desta receita:
              </h3>
              <div className="flex flex-wrap gap-2">
                {receita.IngredientesBase[0].nomesIngrediente.map((ing, idx) => (
                  <span
                    key={idx}
                    className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;