
# 🎬 App de Filmes com Favoritos (React Native + Expo)

Este é um aplicativo desenvolvido com **React Native + Expo**, que permite pesquisar filmes, visualizar seus detalhes e adicioná-los à lista de favoritos. Os dados são fornecidos pela **OMDb API**.

---

## ✨ Funcionalidades

- 🔍 Busca de filmes por título
- 📄 Visualização de detalhes do filme (sinopse, ano, gênero, atores, etc.)
- ❤️ Favoritar e desfavoritar filmes
- 📦 Armazenamento local com `AsyncStorage`
- 🔄 Ícones interativos e navegação entre telas com `expo-router`


---

## 📦 Tecnologias Utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [OMDb API](https://www.omdbapi.com/)
- [React Navigation / Expo Router](https://expo.github.io/router/)
- [Ionicons](https://icons.expo.fyi/)

---

## 🚀 Instalação

> Requisitos:
> - Node.js instalado
> - Expo CLI (`npm install -g expo-cli`)
> - Conta na [OMDb API](https://www.omdbapi.com/) para obter uma chave de API gratuita


 2. **Acesse o diretório**
 cd nome-do-repositorio

# 3. Instale as dependências
 npm install

 4.  **Edite diretamente sua chave da OMDb no arquivo api.js)**

1.  const API_KEY = "SUA_CHAVE_OMDB";

# 4. Inicie o projeto

 ``
 npx expo start ou npx expo start --tunnel

# 5. Estrutura de Pastas

````markdown
```

├── app/
│   ├── index.js              # Tela inicial (lista de filmes)
│   ├── movie/[id].js         # Tela de detalhes do filme
│   └── favorites.js          # Tela de favoritos
├── components/
│   └── MovieCard.js          # Componente reutilizável para cards de filmes
├── services/
│   └── api.js                # Configuração da OMDb API
├── assets/
│   └── icon.png              # Ícones ou imagens
└── README.md
```
````
