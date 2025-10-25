# 🍽️ Receitas App - Fullstack Application

Aplicação fullstack para busca e consulta de receitas culinárias baseada nos ingredientes disponíveis.

![Next.js](https://img.shields.io/badge/Next.js


![React](https://img.shields.io/badge/React-19-61DAFB?style=flatio/badge/TypeScript-5-3178C6?style=/badge/Flask-3.0-000000?style=flat&logo=/badge/Python-3.11+-3776AB?style=flat&logo/badge/Tailwind-3.4-38B2AC 🚀 Tecnologias

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **Lucide React** (ícones)

### Backend
- **Flask 3.0**
- **Python 3.11+**
- **Requests** (HTTP client)
- **Flask-CORS**

### API Externa
- [API de Receitas](https://api-receitas-pi.vercel.app)

## 📋 Funcionalidades

✅ Busca de receitas por ingredientes  
✅ Filtros por tipo (doce, salgado, agridoce)  
✅ Busca por nome/descrição  
✅ Visualização detalhada de receitas  
✅ Paginação de resultados  
✅ Interface responsiva  
✅ Sistema de match score (receitas com mais ingredientes disponíveis)  

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- Python 3.11+
- npm ou yarn

### Backend (Flask)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python run.py
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## 🔌 Endpoints da API Backend

### Health Check
```http
GET /api/receitas/health
```

### Buscar Todas as Receitas
```http
GET /api/receitas/todas?page=1&limit=10
```

### Buscar Receita por ID
```http
GET /api/receitas/{id}
```

### Buscar por Tipo
```http
GET /api/receitas/tipo/{tipo}
```
Tipos: `doce`, `salgado`, `agridoce`

### Buscar Receitas
```http
GET /api/receitas/buscar?q=bolo&page=1&limit=10
GET /api/receitas/buscar?ingredientes=farinha,ovos&page=1&limit=10
```

### Filtrar Receitas
```http
GET /api/receitas/filtrar?tipo=doce&q=chocolate
```

## 🎨 Design

O design segue um wireframe com melhorias de UX/UI:
- Interface limpa e intuitiva
- Cores primárias: Amarelo (#FFC857) e Cinza escuro (#2D3142)
- Cards de receitas com imagens
- Sistema de tags para ingredientes
- Paginação intuitiva
- Loading states
- Design responsivo mobile-first

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- **Desktop** (1920px+)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 📊 Diagramas (Mermaid)

<details>
<summary><b>🏗️ Arquitetura Geral do Sistema</b></summary>

```mermaid
flowchart LR
    U((👤 Usuário))
    
    subgraph Frontend["🎨 Frontend - Next.js"]
        UI[Interface React]
        API[API Client]
    end
    
    subgraph Backend["⚙️ Backend - Flask"]
        Routes[Rotas]
        Service[Serviços]
    end
    
    DB[(🗄️ API Externa)]
    
    U -->|Interage| UI
    UI -->|HTTP| API
    API -->|REST| Routes
    Routes --> Service
    Service -->|Consulta| DB
    
    style U fill:#FFD700,stroke:#333,stroke-width:3px
    style Frontend fill:#E3F2FD,stroke:#1976D2,stroke-width:2px
    style Backend fill:#FFF3E0,stroke:#F57C00,stroke-width:2px
    style DB fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px
```

</details>

<details>
<summary><b>🔄 Fluxo Principal da Aplicação</b></summary>

```mermaid
flowchart TD
    A([🚀 Início]) --> B[Carrega Página]
    B --> C[Busca Receitas]
    C --> D{Sucesso?}
    D -->|✅ Sim| E[Exibe Receitas]
    D -->|❌ Não| F[Mostra Erro]
    E --> G([✨ Fim])
    F --> G
    
    style A fill:#4CAF50,stroke:#2E7D32,stroke-width:3px,color:#fff
    style E fill:#4CAF50,stroke:#2E7D32,stroke-width:2px,color:#fff
    style F fill:#F44336,stroke:#C62828,stroke-width:2px,color:#fff
    style G fill:#2196F3,stroke:#1565C0,stroke-width:3px,color:#fff
    style D fill:#FF9800,stroke:#E65100,stroke-width:2px
```

</details>

<details>
<summary><b>🔍 Busca por Ingredientes</b></summary>

```mermaid
sequenceDiagram
    autonumber
    actor 👤 as Usuário
    participant 🔍 as SearchBar
    participant ⚡ as Hook
    participant 🌐 as Backend
    participant 💾 as API
    
    👤->>🔍: Digite ingredientes
    🔍->>⚡: Enviar busca
    activate ⚡
    ⚡->>🌐: GET /buscar
    activate 🌐
    🌐->>💾: Consulta dados
    activate 💾
    💾-->>🌐: Resultados
    deactivate 💾
    🌐->>🌐: Calcula match_score
    🌐-->>⚡: Lista ordenada
    deactivate 🌐
    ⚡->>⚡: Atualiza estado
    ⚡-->>👤: Mostra receitas
    deactivate ⚡
    
    Note over 🌐,💾: Consolida múltiplas<br/>requisições
```

</details>

<details>
<summary><b>🎛️ Filtros por Tipo</b></summary>

```mermaid
flowchart LR
    A[👤 Clica Filtro] --> B{Qual?}
    B -->|🍰 Doce| C[Filtra Doce]
    B -->|🍕 Salgado| D[Filtra Salgado]
    B -->|🍜 Agridoce| E[Filtra Agridoce]
    B -->|📋 Todas| F[Remove Filtro]
    
    C --> G[📡 Backend]
    D --> G
    E --> G
    F --> G
    
    G --> H[✨ Atualiza Lista]
    
    style A fill:#FFD700,stroke:#F57C00,stroke-width:2px
    style B fill:#FF9800,stroke:#E65100,stroke-width:2px
    style H fill:#4CAF50,stroke:#2E7D32,stroke-width:2px,color:#fff
    style G fill:#2196F3,stroke:#1565C0,stroke-width:2px,color:#fff
```

</details>

<details>
<summary><b>🧩 Componentes Frontend</b></summary>

```mermaid
graph TD
    A[📱 Page] --> B[🎯 Header]
    A --> C[🔍 SearchBar]
    A --> D[🎛️ FilterBar]
    A --> E[📋 RecipeList]
    A --> F[⚡ useReceitas]
    
    E --> G[🍽️ RecipeCard]
    F --> H[🌐 API Service]
    
    style A fill:#2196F3,stroke:#1565C0,stroke-width:3px,color:#fff
    style F fill:#4CAF50,stroke:#2E7D32,stroke-width:2px,color:#fff
    style H fill:#FF9800,stroke:#E65100,stroke-width:2px,color:#fff
    style G fill:#FFD700,stroke:#F57C00,stroke-width:2px
```

</details>

<details>
<summary><b>⚙️ Componentes Backend</b></summary>

```mermaid
graph TD
    A[⚙️ Flask App] --> B[🛣️ Routes]
    B --> C[💼 APIService]
    C --> D[🌐 API Externa]
    
    B --> E[🛡️ Error Handler]
    C --> F[📝 Logger]
    
    style A fill:#FF9800,stroke:#E65100,stroke-width:3px,color:#fff
    style C fill:#4CAF50,stroke:#2E7D32,stroke-width:2px,color:#fff
    style D fill:#9C27B0,stroke:#6A1B9A,stroke-width:2px,color:#fff
    style E fill:#F44336,stroke:#C62828,stroke-width:2px,color:#fff
```

</details>

<details>
<summary><b>🎯 Jornada do Usuário</b></summary>

```mermaid
journey
    title 🎯 Jornada: Encontrar Receita
    section Entrada
        Abrir app: 5: Usuário
        Ver interface: 4: Usuário
    section Busca
        Digitar ingredientes: 5: Usuário
        Pesquisar: 5: Usuário
        Ver resultados: 5: Usuário
    section Decisão
        Escolher receita: 5: Usuário
        Ler detalhes: 5: Usuário
        Fazer receita: 5: Usuário
```

</details>

<details>
<summary><b>📦 Estrutura de Dados</b></summary>

```mermaid
erDiagram
    RECEITA ||--o{ INGREDIENTE : contém
    RECEITA {
        int id
        string nome
        string tipo
        int match_score
    }
    INGREDIENTE {
        int id
        array nomes
        int receita_id
    }
    RESPONSE ||--|{ RECEITA : inclui
    RESPONSE {
        array data
        object meta
    }
```

</details>

<details>
<summary><b>🔄 Comunicação Entre Camadas</b></summary>

```mermaid
sequenceDiagram
    participant 👤 as User
    participant 🎨 as UI
    participant ⚡ as Hook
    participant 🌐 as API
    
    👤->>🎨: Interação
    🎨->>⚡: Ação
    activate ⚡
    ⚡->>🌐: Request
    activate 🌐
    🌐-->>⚡: Response
    deactivate 🌐
    ⚡->>⚡: Update
    ⚡-->>🎨: Render
    deactivate ⚡
    🎨-->>👤: Resultado
```

</details>

## 🧪 Testes

Para testar a aplicação:

1. Inicie o backend (`python run.py`)
2. Inicie o frontend (`npm run dev`)
3. Acesse http://localhost:3000
4. Teste as funcionalidades:
   - Busca por ingredientes
   - Filtros por tipo
   - Paginação
   - Visualização de detalhes

## 👥 Histórias de Usuário Implementadas

✅ **História 1**: Busca por Ingredientes  
✅ **História 2**: Visualização de Lista  
✅ **História 3**: Filtros por Tipo  
✅ **História 4**: Detalhes da Receita  
✅ **História 5**: Interface Responsiva  
✅ **História 6**: Busca Avançada  

## 📝 Notas de Desenvolvimento

- O backend atua como middleware entre o frontend e a API externa
- Sistema de match score identifica receitas com mais ingredientes disponíveis
- Tratamento robusto de erros em todas as camadas
- Logs detalhados para debugging
- Componentes reutilizáveis e testáveis

## 🔧 Melhorias Futuras

- [ ] Adicionar autenticação de usuários
- [ ] Sistema de favoritos
- [ ] Histórico de buscas
- [ ] Testes unitários e E2E
- [ ] CI/CD pipeline

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

***

**Desenvolvido com ❤️ usando Next.js e Flask**
```