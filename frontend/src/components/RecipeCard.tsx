'use client';

import React from 'react';
import { Receita } from '@/types/receita';
import { Clock, Star } from 'lucide-react';
import Image from 'next/image';

interface RecipeCardProps {
  receita: Receita;
  onClick: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ receita, onClick }) => {
  const extractTempoPreparo = (modoPreparo: string): string | null => {
    const match = modoPreparo?.match(/(\d+)\s*(min|minutos|horas?|h)/i);
    return match ? `${match[1]}${match[2].toLowerCase().startsWith('h') ? 'h' : 'min'}` : null;
  };

  const tempoPreparo = extractTempoPreparo(receita.modo_preparo);

  const getTipoLabel = (tipo: string) => {
    const labels: { [key: string]: string } = {
      'doce': 'Doce',
      'salgado': 'Salgado',
      'agridoce': 'Agridoce'
    };
    return labels[tipo] || tipo;
  };

  return (
    <div
      onClick={() => onClick(receita.id)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border-2 border-gray-100 hover:border-primary transform hover:-translate-y-1"
    >
      {receita.link_imagem ? (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={receita.link_imagem}
            alt={receita.receita}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-secondary flex-1 line-clamp-2">
            {receita.receita}
          </h3>
          <Star className="text-primary fill-primary ml-2 flex-shrink-0" size={20} />
        </div>

        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold">Tipo:</span> {getTipoLabel(receita.tipo)}
        </p>

        {tempoPreparo && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            <span className="font-semibold">Tempo de Preparo:</span>
            <span className="ml-1">{tempoPreparo}</span>
          </div>
        )}

        {receita.match_score && receita.match_score > 1 && (
          <div className="mt-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {receita.match_score} ingredientes encontrados
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;