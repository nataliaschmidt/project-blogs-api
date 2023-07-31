# Blog API

Desenvolvimento de uma API e um banco de dados para a produção de conteúdo para um blog, utilizando as práticas do REST e aplicando a Arquitetura de Software em camadas MSC (Model - Service - Controller)

## Tecnologias Utilizadas
<hr>

- Docker
- Node.js
- Express
- Sequelize
- JWT

## Instruções
<hr>

- Clone este repositório.

```bash
git clone git@github.com:nataliaschmidt/project-blogs-api.git
```
- Acesse o diretório do porjeto e instale suas dependências
```bash
npm install
```

- Inicie os containers do compose `blogs_api` e `blogs_api_db`
```bash
docker-compose up -d
```

Acesse o terminal interativo do container criado pelo compose
```bash
docker exec -it blogs_api bash
```

Instale as dependências dentro do container
```bash
npm install
```

Inicie o servidor dentro do container
```bash
npm start
```

Para criar o banco de dados e popular ele utilize os comandos
```bash
npm prestart
npm seed
```