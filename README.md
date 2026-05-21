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