# Backend - Sistema de Gestão de Promotores

Um sistema backend para gestão de promotores que visitam lojas, desenvolvido com Node.js, TypeScript, Express e Prisma.

## 📋 Sobre o Projeto

Este projeto é uma API REST desenvolvida para gerenciar o trabalho de promotores que visitam estabelecimentos comerciais. O sistema permite:

- **Gerenciamento de Usuários**: Controle de acesso ao sistema
- **Cadastro de Promotores**: Profissionais responsáveis pelas visitas
- **Cadastro de Lojas**: Estabelecimentos que recebem visitas
- **Controle de Visitas**: Registro e acompanhamento das visitas realizadas

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hashing de senhas

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma          # Definição do banco de dados
│   ├── migrations/            # Migrações do banco
│   └── config.ts              # Configuração do Prisma
├── src/
│   ├── app.ts                 # Ponto de entrada da aplicação
│   ├── prisma.ts              # Configuração do cliente Prisma
│   ├── controllers/           # Controladores da API
│   ├── routes/                # Definição das rotas
│   ├── services/              # Lógica de negócio
│   └── middlewares/           # Middlewares personalizados
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
└── README.md                  # Este arquivo
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
PORT=3333
JWT_SECRET="sua-chave-secreta-aqui"
```

### 4. Configure o banco de dados

```bash
# Execute as migrações
npx prisma migrate dev

# Gere o cliente Prisma
npx prisma generate
```

### 5. Execute o projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## 📊 Modelo de Dados

### Usuário
- `id`: Identificador único
- `nome`: Nome completo
- `email`: Email único para login
- `senha`: Senha criptografada
- `createdAt/updatedAt`: Timestamps

### Promotor
- `id`: Identificador único
- `nome`: Nome do promotor
- `email`: Email único
- `telefone`: Telefone (opcional)
- `ativo`: Status do promotor
- `visitas`: Lista de visitas realizadas
- `createdAt/updatedAt`: Timestamps

### Loja
- `id`: Identificador único
- `nome`: Nome da loja
- `endereco`: Endereço completo
- `cidade`: Cidade onde está localizada
- `ativo`: Status da loja
- `visitas`: Lista de visitas recebidas
- `createdAt/updatedAt`: Timestamps

### Visita
- `id`: Identificador único
- `data`: Data da visita
- `status`: Status (pendente/concluída/cancelada)
- `observacoes`: Observações da visita (opcional)
- `promotorId`: ID do promotor responsável
- `lojaId`: ID da loja visitada
- `createdAt/updatedAt`: Timestamps

## 🔗 Endpoints da API

### Teste de Conexão
- `GET /teste-banco` - Verifica conexão com o banco de dados

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de novo usuário

### Promotores
- `GET /promotores` - Lista todos os promotores
- `GET /promotores/:id` - Busca promotor por ID
- `POST /promotores` - Cria novo promotor
- `PUT /promotores/:id` - Atualiza promotor
- `DELETE /promotores/:id` - Remove promotor

### Lojas
- `GET /lojas` - Lista todas as lojas
- `GET /lojas/:id` - Busca loja por ID
- `POST /lojas` - Cria nova loja
- `PUT /lojas/:id` - Atualiza loja
- `DELETE /lojas/:id` - Remove loja

### Visitas
- `GET /visitas` - Lista todas as visitas
- `GET /visitas/:id` - Busca visita por ID
- `POST /visitas` - Registra nova visita
- `PUT /visitas/:id` - Atualiza visita
- `DELETE /visitas/:id` - Remove visita

## 🧪 Testando a API

O servidor roda por padrão na porta 3333. Você pode testar os endpoints usando ferramentas como:

- **Postman**
- **Insomnia**
- **Thunder Client** (extensão do VS Code)
- **curl**

### Exemplo de teste:

```bash
# Testar conexão com o banco
curl http://localhost:3333/teste-banco
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor com hot-reload

# Produção
npm run build        # Compila TypeScript
npm start            # Executa versão compilada

# Banco de dados
npx prisma studio    # Interface gráfica para o banco
npx prisma migrate dev  # Executa migrações em desenvolvimento
npx prisma generate  # Gera cliente Prisma
```

## 🔒 Segurança

- Senhas são criptografadas usando bcryptjs
- Autenticação baseada em JWT tokens
- Validação de entrada de dados
- Controle de acesso baseado em roles (futuro)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ usando Node.js, TypeScript e Prisma**