export interface Receita {
  id: number;
  receita: string;
  ingredientes: string;
  modo_preparo: string;
  link_imagem?: string;
  tipo: 'doce' | 'salgado' | 'agridoce';
  created_at: string;
  match_score?: number;
  IngredientesBase?: IngredienteBase[];
}

export interface IngredienteBase {
  id: number;
  nomesIngrediente: string[];
  receita_id: number;
  created_at: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  totalItems?: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ReceitasResponse {
  data: Receita[];
  meta: PaginationMeta;
  links?: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export type TipoReceita = 'doce' | 'salgado' | 'agridoce' | 'todas';