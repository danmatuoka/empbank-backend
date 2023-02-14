## Empbank API

- Backend desenvolvido para página de controle financeiro pessoal que permite aos usuários controlar suas finanças de maneira fácil e intuitiva.

## Instalação
- Clone o repositório
```
git clone  <git hub template url> <project_name>
```

- Instale as dependencias 
```
yarn ou yarn install
```

- Preencha o arquivo .env com as informações do banco de dados Postgresql

- Rode as migrations
```
yarn typeorm migration:run -d src/data-source.ts
```

- Rode o servidor
```
yarn dev
```

## **Rodando os testes** 

Para rodar os testes de integração é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar o comando a seguir:
````
yarn test
````

## Endpoints
### Criar novo usuário

`POST /user - status 201`

Request
  
  ```
  {
	"name": "user",
	"email": "user@mail.com",
	"password": "123"
}
  
  ```

Response
```
{
	"name": "User",
	"email": "User@mail.com",
	"id": "4c0e89f0-c0e2-4caf-813e-4751488f830a"
}
  ```
 
### Login com usuário
  `POST /login - status 200`

Request
  
  ```
  {
	"email": "user@mail.com",
	"password": "123"
}
  ```
Response
```
 {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 }
  ```
  ### Rotas que necessitam de TOKEN
  ---------------------
  ### Listar usuário
  `GET /user - status 200`
  
  Response
  
  ```
 {
	"id": "4c0e89f0-c0e2-4caf-813e-4751488f830a",
	"name": "User",
	"email": "user@mail.com"
}
  
  ```

  ### Listar transações
  `GET /transaction - status 200`
  - Faz a listagem das transações em ordem crescente de data.
  - Faz a listagem de 5 transações por página.
  
  Response
  
  ```
  {
	"count": 10,
	"page": "1",
	"transactions": [
		{
			"id": "89183d8a-26bb-42d6-8b55-f4dfd038ea39",
			"title": "exemplo",
			"value": "45",
			"category": "aluguel",
			"type": "saida",
			"created_at": "2023-02-13T19:26:19.188Z"
		},
		{
			"id": "fe34d6a5-0173-434d-8ba4-2487707b74bb",
			"title": "exemplo",
			"value": "123",
			"category": "salario",
			"type": "entrada",
			"created_at": "2023-02-13T19:24:51.435Z"
		},
    ...
    }
  ```
  
  ### Listar todas as transações
  `GET /transaction/all - status 200`
  
  ```
  [
	{
		"id": "49bfc89b-a3d7-451f-ba54-455df3c1f37d",
		"title": "exemplo",
		"value": "45,00",
		"category": "Alimentação",
		"type": "saída",
		"created_at": "2023-02-13T16:43:05.459Z"
	},
	{
		"id": "f2b7147c-d13a-415f-855e-1fb8e8af0823",
		"title": "exemplo",
		"value": "45,00",
		"category": "Alimentação",
		"type": "entrada",
		"created_at": "2023-02-13T16:43:11.294Z"
	},
  ...
  ]
  ```
  
  ### Criar uma nova transação
  `POST /transaction - status 201`
  
  Request
  ```
  {
	"title": "exemplo",
	"value": "50,00",
	"category": "Alimentação",
	"type": "saída"
}
  ```
  
  Response
  
  ```
  {
	"title": "exemplo",
	"value": "5,00",
	"category": "Alimentação",
	"type": "saída",
	"user": {
		"id": "4c0e89f0-c0e2-4caf-813e-4751488f830a",
		"name": "User",
		"email": "user@mail.com"
	},
	"id": "010b58ce-32f7-4f86-97cf-566b288b9ae5",
	"created_at": "2023-02-13T18:29:28.633Z"
 }

  ```
  
  
  ## Tecnologias utilizadas
  - Node
  - Typescript
  - Express
  - TypeORM
  - PostgreSQL
  - Jest
  
  [⬆ Voltar ao topo](#Empbank-api)<br>
  
