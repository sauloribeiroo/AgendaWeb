# Agenda de Contatos — React + Firebase

Aplicação web de agenda de contatos com persistência em tempo real no Firebase
Realtime Database e verificação de duplicidade por nome.

## Funcionalidades

- Cadastro de contatos com **nome, sobrenome e telefone**.
- Persistência no **Firebase Realtime Database**.
- Verificação de duplicidade pelo campo **nome** (case-insensitive).
- Ao detectar duplicidade, abre um modal perguntando se o novo telefone deve
  ser adicionado ao contato existente ou se deve criar um novo contato.
- Listagem em tempo real (atualização automática quando o banco muda).
- **Desafio extra**: contatos podem ter **múltiplos telefones**, exibidos
  agrupados na interface, com opção de remover um telefone individualmente.

## Estrutura

```
src/
├── App.jsx                 # estado global, listener do Firebase e fluxo principal
├── firebase.js             # inicialização do Firebase
├── main.jsx                # entrypoint React
├── styles.css              # estilos
└── components/
    ├── ContactForm.jsx     # formulário de cadastro
    ├── ContactList.jsx     # lista de contatos (telefones agrupados)
    └── ConfirmDialog.jsx   # modal de confirmação para duplicidade
```

## Como configurar o Firebase

> 📘 **Guia detalhado, passo a passo, com prints conceituais e troubleshooting**:
> veja [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

Resumo rápido:

1. Acesse <https://console.firebase.google.com/> e crie um projeto.
2. No menu lateral, vá em **Build → Realtime Database** e crie um banco
   (inicie em **modo de teste**).
3. Em **Configurações do projeto → Geral → Seus apps**, registre um app **Web**
   (ícone `</>`) e copie as credenciais do `firebaseConfig`.
4. Na raiz do projeto, copie `.env.example` para `.env` e preencha com as
   credenciais do seu projeto:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_DATABASE_URL=https://<seu-projeto>-default-rtdb.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

## Como executar

```bash
npm install
npm run dev
```

A aplicação ficará disponível em <http://localhost:5173>.

## Como funciona a verificação de duplicidade

No envio do formulário, `App.jsx` compara o nome digitado com a lista atual
(`contacts`) usando `name.trim().toLowerCase()`. Se encontrar um contato com o
mesmo nome:

- Mostra o `ConfirmDialog` perguntando ao usuário.
- **Sim** → o novo telefone é adicionado ao array `telefones` do contato
  existente via `update()`.
- **Não** → um novo registro é criado via `push()`.

Se não houver duplicidade, o cadastro é feito direto.

## Modelo de dados no Realtime Database

```
contatos/
  -NxAbc123/
    nome: "Maria"
    sobrenome: "Silva"
    telefones: ["(11) 99999-0000", "(11) 91234-5678"]
```
