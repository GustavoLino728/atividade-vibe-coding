// src/components/FilterBar.tsx
'use client';

import React from 'react';
import { TipoReceita } from '@/types/receita';

interface FilterBarProps {
  selectedTipo: TipoReceita;
  onTipoChange: (tipo: TipoReceita) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ selectedTipo, onTipoChange }) => {
  const tipos: { value: TipoReceita; label: string }[] = [
    { value: 'todas', label: 'Todas' },
    { value: 'doce', label: 'Doce' },
    { value: 'salgado', label: 'Salgado' },
    { value: 'agridoce', label: 'Agridoce' },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {tipos.map((tipo) => (
        <button
          key={tipo.value}
          onClick={() => onTipoChange(tipo.value)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            selectedTipo === tipo.value
              ? 'bg-secondary text-white shadow-lg scale-105'
              : 'bg-white text-secondary hover:bg-gray-100 shadow'
          }`}
        >
          {tipo.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;