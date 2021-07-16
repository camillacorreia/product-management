# Product Management

Projeto desenvolvido no projeto final do curso "Desenvolvimento Avançado em Angular" da plataforma @desenvolvedor.io.
No backend foi utilizada a API disponibilizada no curso.

#### O sistema possui:

- Cadastro de usuário;
- Login;
- CRUD de fornecedor;
- CRUD de produto.

#### Foi aplicado:

- Lazy Loading para carregamento de módulos;
- Guarda de rotas;
- HttpCustomInterceptor;
- Validação de formulário;
- Verificação de CPF/CNPJ válidos;
- Redirect à rota não autorizada após fazer o login;
- Resolvers;
- Pipes;
- Diretivas;
- Upload de imagem.

---

#### Preparando o ambiente

# Back-end

### Docker

- Instalar (https://www.docker.com/products/docker-desktop)
- Instalar extensão no vsCode (https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- Arquivos disponibilizados pela plataforma do curso (não é necessário baixar):
  - https://github.com/desenvolvedor-io/curso-angular-avancado
- Execute os comandos abaixo no seu terminal:

`cd back-end`

`docker-compose -f docker-compose.backend.yml up`

- Após o processo finalizar, os containers irão aparecer na sua extensão do vsCode.
- Documentação da API, com os containers rodando acesse: http://localhost:5001/swagger/index.html

# Front-end

`npm install`

#### Server

`ng serve`
