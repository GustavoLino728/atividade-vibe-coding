# 🍽️ Receitas App - Fullstack Application

Aplicação fullstack para busca e consulta de receitas culinárias baseada nos ingredientes disponíveis.

## 🚀 Tecnologias

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)

### Backend
- **Flask 3.0**
- **Python 3.11+**
- **Requests** (HTTP client)
- **Flask-CORS**

### API Externa
- API de Receitas: https://api-receitas-pi.vercel.app

## 📋 Funcionalidades

✅ Busca de receitas por ingredientes
✅ Filtros por tipo (doce, salgado, agridoce)
✅ Busca por nome/descrição
✅ Visualização detalhada de receitas
✅ Paginação de resultados
✅ Interface responsiva
✅ Sistema de match score (receitas com mais ingredientes disponíveis)


## 📝 Notas de Desenvolvimento

- O backend atua como middleware entre o frontend e a API externa
- Sistema de cache pode ser implementado para melhorar performance
- O match score ajuda a identificar receitas com mais ingredientes disponíveis
- Tratamento robusto de erros em todas as camadas
- Logs detalhados para debugging

## 👥 Histórias de Usuário Implementadas

✅ História 1: Busca por Ingredientes
✅ História 2: Visualização de Lista
✅ História 3: Filtros por Tipo
✅ História 4: Detalhes da Receita
✅ História 5: Interface Responsiva
✅ História 6: Busca Avançada

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.