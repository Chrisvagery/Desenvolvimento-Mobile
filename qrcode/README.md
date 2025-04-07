
# Aplicativo Leitor de QR Code 📱

Este projeto foi desenvolvido como parte de um tutorial prático com React Native e Expo. O objetivo foi construir um app funcional que permite escanear QR Codes, salvar os resultados localmente, visualizar um histórico e explorar recursos como compartilhamento e navegação entre telas.

## 🚀 Funcionalidades implementadas

1. 📷 Escaneamento de QR Codes usando a câmera do dispositivo.

2. 📋 Armazenamento local dos QR Codes escaneados utilizando AsyncStorage.

3. 📜 Visualização do histórico de QR Codes escaneados.

4. 🌙 Alternância entre modo claro e escuro na tela de histórico.

5. 🗑 Limpeza do histórico com confirmação por alerta.

6. 🔗 Abertura do link do QR Code em navegador.

7. 🤝 Compartilhamento de links via menu nativo de compartilhamento.

8. 🔄Alternância entre câmeras frontal e traseira.


📂 Estrutura de arquivos principais

- `index.jsx`: Tela principal com a câmera ativa para leitura de QR Code.
- `historico.jsx`: Tela que exibe a lista de QR Codes escaneados.
- `layout.jsx`: Gerencia a navegação entre as telas com expo-router.

### 📂 Estrutura de arquivos principais

 📁 app/
├── index.jsx        # Tela principal com a câmera ativa
├── historico.jsx    # Tela de visualização do histórico
├── _layout.jsx      # Navegação com expo-router


## 🧪 Tecnologias utilizadas

- **React Native** com **Expo**
- `expo-camera` (acesso à câmera)
- `expo-router` (navegação entre telas)
- `@react-native-async-storage/async-storage` (persistência local)
- `react-native` + `StyleSheet` (UI)
- **Ionicons** (ícones)
- `Share`, `Linking`, `Alert`, `TouchableOpacity`, `FlatList` (componentes nativos)

---

## ⚠️ Requisitos e limitações

- Requer permissão de uso da câmera para funcionar corretamente.
- Histórico é salvo apenas no dispositivo e **não sincroniza com a nuvem**.
- O app **não valida se o conteúdo do QR Code é seguro** (apenas tenta abrir como URL).
- Apenas **QR Codes** são suportados (não há suporte para outros tipos de código de barras).

---

## ▶️ Como rodar o projeto localmente

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/leitor-qr-app.git
cd leitor-qr-app
