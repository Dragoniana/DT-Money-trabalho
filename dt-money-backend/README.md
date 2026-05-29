# Dtmoney - Backend

Este é o backend do projeto **dtmoney**.

## 🚀 Tecnologias

- **Node.js**
- **TypeScript**
- **TypeORM**
- **SQLite**

## 📦 Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### 1️⃣ Clonar o repositório

```sh
git clone https://github.com/danielgualberto89/unileste-sistemasmoveis/tree/main/dt-money-backend.git
cd dtmoney-backend
```

### 2️⃣ Instalar as dependências

Utilize o gerenciador de pacotes **yarn** ou **npm** para instalar todas as dependências do projeto:

```sh
npm i
```

### 3️⃣ Rodar as migrations

Execute o comando abaixo para criar as tabelas no banco de dados:

```sh
npm run migration:run
```

### 4️⃣ Iniciar o servidor

Agora, basta rodar o servidor com:

```sh
npm run dev
```

O backend estará rodando em `http://localhost:3001`.
Para acessar a documentação `http://localhost:3001/docs`
