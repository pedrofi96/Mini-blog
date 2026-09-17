# Mini-blog

Aplicação de blog full stack construída em **React**, utilizando o **Firebase** (Firestore + Authentication) como back-end.

## Sobre o projeto

Plataforma onde usuários autenticados podem criar, editar e excluir posts, enquanto qualquer visitante pode navegar, ler e buscar publicações. O projeto foi desenvolvido para praticar hooks customizados, Context API para autenticação global e rotas protegidas com React Router.

## Tecnologias utilizadas

- React
- React Router DOM (rotas públicas e protegidas)
- Firebase Authentication (cadastro/login de usuários)
- Firebase Firestore (banco de dados NoSQL em tempo real)
- Context API (estado global de autenticação)
- CSS Modules

## Funcionalidades

- Cadastro e login de usuários (Firebase Authentication)
- Criação, edição e exclusão de posts (somente usuário autenticado e dono do post)
- Listagem de posts na Home e página de detalhes de cada post
- Busca de posts por palavra-chave
- Dashboard pessoal com os posts do usuário logado
- Redirecionamento automático: rotas de login/registro ficam indisponíveis para quem já está autenticado; rotas de criação/edição exigem login

## Hooks customizados

O projeto centraliza toda a lógica de acesso ao Firestore em hooks reutilizáveis:

- `useAuthentication` — cadastro, login, logout e criação do perfil no Firebase Auth
- `useFetchDocuments` / `useFetchDocument` — busca de múltiplos documentos (com filtro opcional) e de um documento específico
- `useInsertDocument` — criação de novo post, com controle de estado via `useReducer`
- `useUpdateDocument` — edição de post existente
- `useDeleteDocument` — exclusão de post
- `useQuery` — leitura de parâmetros da URL

Todos os hooks de escrita (`insert`, `update`, `delete`) tratam o estado de `loading`/`error` com `useReducer` e cancelam o dispatch se o componente for desmontado antes da resposta, evitando o warning de memory leak do React.

## Estrutura do projeto

```
Mini-blog/
└── src/
    ├── components/       # Navbar, Footer, PostDetail
    ├── context/          # AuthContext
    ├── firebase/         # Configuração do Firebase
    ├── hooks/            # Hooks customizados de dados e autenticação
    └── pages/            # Home, About, Login, Register, Dashboard, Search, CreatePost, EditPost, Post
```

## Como rodar localmente

```bash
npm install
```

Crie um projeto no [Firebase Console](https://console.firebase.google.com/), ative **Authentication** (e-mail/senha) e **Firestore Database**, e configure suas credenciais em `src/firebase/config.js`:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

```bash
npm start
```

A aplicação sobe em `http://localhost:3000`.

## Autor

Pedro Filipe Tavares Baptista — [github.com/pedrofi96](https://github.com/pedrofi96)
