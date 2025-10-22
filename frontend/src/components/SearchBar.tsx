'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, ingredientes: string[]) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  placeholder = 'Digite os ingredientes separados por vírgula...'
}) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredientes, setIngredientes] = useState<string[]>([]);

  const handleAddIngrediente = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredientes.includes(trimmed)) {
      const novosIngredientes = [...ingredientes, trimmed];
      setIngredientes(novosIngredientes);
      setInputValue('');
    }
  };

  const handleRemoveIngrediente = (ingrediente: string) => {
    setIngredientes(ingredientes.filter(i => i !== ingrediente));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngrediente();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddIngrediente();
    }
    onSearch('', ingredientes.length > 0 ? ingredientes : [inputValue.trim()]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-200">
        <h2 className="text-lg font-semibold text-secondary mb-3">Inventário</h2>
        
        {ingredientes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {ingredientes.map((ingrediente, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-primary text-secondary px-3 py-1 rounded-full text-sm font-medium"
              >
                {ingrediente}
                <button
                  onClick={() => handleRemoveIngrediente(ingrediente)}
                  className="hover:bg-primary-dark rounded-full p-0.5"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          <button
            type="submit"
            className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Search size={20} />
            Pesquisar receitas
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-2">
          Digite um ingrediente e pressione Enter para adicionar mais
        </p>
      </div>
    </div>
  );
};

export default SearchBar;