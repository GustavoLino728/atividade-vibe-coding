'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import RecipeList from '@/components/RecipeList';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { useReceitas } from '@/hooks/useReceitas';
import { TipoReceita } from '@/types/receita';

export default function Home() {
  const [selectedTipo, setSelectedTipo] = useState<TipoReceita>('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIngredientes, setSearchIngredientes] = useState<string[]>([]);

  const { receitas, loading, error, meta, fetchReceitas, buscarReceitas, filtrarReceitas } = useReceitas();

  useEffect(() => {
    fetchReceitas(1, 12);
  }, [fetchReceitas]);

  const handleSearch = (query: string, ingredientes: string[]) => {
    setSearchQuery(query);
    setSearchIngredientes(ingredientes);
    setCurrentPage(1);
    setSelectedTipo('todas');

    if (ingredientes.length > 0 || query) {
      buscarReceitas(query, ingredientes, 1, 12);
    } else {
      fetchReceitas(1, 12);
    }
  };

  const handleTipoChange = (tipo: TipoReceita) => {
    setSelectedTipo(tipo);
    setCurrentPage(1);

    if (searchIngredientes.length > 0) {
      buscarReceitas(searchQuery, searchIngredientes, 1, 12);
    } else if (tipo === 'todas') {
      fetchReceitas(1, 12);
    } else {
      filtrarReceitas(tipo, searchQuery, 1, 12);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (searchIngredientes.length > 0) {
      buscarReceitas(searchQuery, searchIngredientes, page, 12);
    } else if (selectedTipo !== 'todas') {
      filtrarReceitas(selectedTipo, searchQuery, page, 12);
    } else {
      fetchReceitas(page, 12);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-8">
          <FilterBar selectedTipo={selectedTipo} onTipoChange={handleTipoChange} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Erro ao carregar receitas</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <>
            <RecipeList receitas={receitas} loading={loading} />

            {meta && meta.pageCount > 1 && (
              <Pagination meta={meta} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </main>
    </div>
  );
}