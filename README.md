# Transfer App - Sistema de Transferência de Dados

## 📋 Visão Geral

Um sistema que permite enviar dados do seu celular (via app Flutter) para um servidor Node.js com painel de controle web.

### O que tá funcionando:

✅ **Servidor Node.js/Express**
- Recebe dados via POST `/upload`
- Retorna dados via GET `/dados`
- Salva tudo em arquivo JSON (`dados.json`)
- Painel web para visualizar dados em tempo real

✅ **Painel Web** (no PC)
- Acesse: `http://localhost:3000` ou `https://transfer-xxxx.railway.app`
- Vê todos os dados em tempo real
- Pode limpar dados
- Status online/offline

---

## 🚀 Como Usar o Servidor

### Localmente (PC)

```bash
# 1. Entre na pasta
cd c:\Users\adriano\Documents\projetos\transfer

# 2. Instale dependências (se não tiver)
npm install

# 3. Rode o servidor
npm start

# 4. Abra no navegador
http://localhost:3000
```

### No Railway (Online)

O servidor já está deployado. Acesse:
```
https://transfer-xxxx.railway.app
```

---

## 📱 Como Criar o App Flutter

### Pré-requisitos

- Flutter instalado (https://flutter.dev/docs/get-started/install)
- Android Studio ou VSCode com extensão Flutter
- Dispositivo Android/emulador

### Passos

**1. Crie um novo projeto Flutter:**
```bash
flutter create transfer_app
cd transfer_app
```

**2. Abra `lib/main.dart` e substitua o conteúdo** pelo código em `flutter_app_main.dart` deste repositório

**3. Abra `pubspec.yaml` e adicione a dependência `http`:**

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
```

**4. Instale as dependências:**
```bash
flutter pub get
```

**5. Configure a URL do servidor:**

No arquivo `lib/main.dart`, procure por:
```dart
static const String serverUrl = 'https://transfer-xxxx.railway.app/upload';
```

- Para testar **localmente**: `http://localhost:3000/upload`
- Para usar **Railway**: substitua `xxxx` pela URL do seu projeto

**6. Execute o app:**
```bash
flutter run
```

---

## 🔌 Rotas da API

### GET `/`
```bash
curl http://localhost:3000/
```
Resposta:
```json
{ "mensagem": "Servidor está rodando!" }
```

### POST `/upload`
```bash
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: application/json" \
  -d '{"nome":"Adriano","idade":25,"mensagem":"Oi"}'
```

Resposta:
```json
{
  "sucesso": true,
  "mensagem": "Dados recebidos e salvos com sucesso!",
  "dados_recebidos": {
    "nome": "Adriano",
    "idade": 25,
    "mensagem": "Oi",
    "timestamp": "24/05/2026 01:30:00"
  }
}
```

### GET `/dados`
```bash
curl http://localhost:3000/dados
```

Retorna todos os dados salvos em JSON.

### DELETE `/dados`
```bash
curl -X DELETE http://localhost:3000/dados
```

Limpa todos os dados.

---

## 📁 Estrutura de Arquivos

```
transfer/
├── server.js              # Servidor principal
├── package.json          # Dependências Node.js
├── dados.json            # Arquivo onde dados são salvos
├── public/
│   └── index.html        # Dashboard web
├── flutter_app_main.dart # Código do app Flutter
└── README.md             # Este arquivo
```

---

## 🐛 Resolvendo Problemas

### "Connection refused" no celular
- O servidor precisa estar rodando
- Verifique a URL (localhost não funciona no celular real, use Railway)

### "Cannot connect to server"
- Substitua `http://localhost:3000` pela URL do Railway
- Verifique se o servidor está online

### Dados não aparecem no painel
- Atualize o painel (botão 🔄)
- Verifique se `dados.json` existe

### App Flutter fecha ao enviar
- Verifique se a URL está correta
- Veja os logs no console

---

## 📤 Testando com cURL (Celular Real)

```bash
# Enviar dados
curl -X POST https://transfer-xxxx.railway.app/upload \
  -H "Content-Type: application/json" \
  -d '{"nome":"Seu Nome","idade":30}'

# Ver todos os dados
curl https://transfer-xxxx.railway.app/dados
```

---

## 🎯 Próximos Passos

- ✅ Salvar em arquivo JSON
- ⬜ Adicionar banco de dados (MongoDB)
- ⬜ Autenticação de usuários
- ⬜ Gráficos e estatísticas
- ⬜ Notificações em tempo real (WebSocket)

---

## 📝 Licença

Projeto pessoal - Use livremente!
