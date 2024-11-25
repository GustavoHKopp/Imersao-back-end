
# API com metodos Get, Post e Put

Este Projeto é uma API com rotas do metódo Get, Post e Put utilizando como banco de dados o MongoDB, e realizado o deploy da aplicação na Google Cloud (https://imersao-back-end-950442253295.southamerica-east1.run.app).

Utilizando Google Gemini para gerar descrição de imagens.


## Funcionalidades

- Listar todos os posts.
- Criar um novo post.
- Fazer o upload de uma imagem.
- Atualizar post.
- Geração de descrição de imagem com Google Gemini


## Deploy

Para fazer instalar as dependencias do projeto rode:

```bash
  npm i
```

Para fazer o deploy desse projeto rode:

```bash
  npm run dev
```

#### Deploy realizado na Google Cloud link: https://imersao-back-end-950442253295.southamerica-east1.run.app


## Documentação da API

#### Retorna todos os posts

```http
  GET /posts
```
#### Adiciona um post com imagem por url

```http
  POST /posts
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `descricao`      | `string` | Descrição da imagem |
| `urlImg`      | `string` | Url da imagem |
| `alt`      | `string` | Texto alternativo da imagem |

#### Fazer o upload de uma imagem do computador
Podendo fazer upload de imagens de qualquer extensão.

```http
    POST /upload
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `imagem`      | `file` | Imagem do computador |

#### Atualizar descricao da imagem com gemini e texto alternativo manualmente

```http
    PUT /upload/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `alt`      | `string` | Texto alternativo da imagem |

#### foundExt(uploadsDir, name)

Recebe o caminho da pasta uploads e o nome da imagem, retornando a extensão do arquivo.


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`STRING_CONEXAO`

`GEMINI_API_KEY`


## Autores

- [@GustavoHKopp](https://www.github.com/GustavoHKopp)

