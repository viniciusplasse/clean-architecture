# ProductStore API

Implementação de uma API REST com base na arquitetura [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) com Express.js e Mongoose.

## Ambiente de produção

https://product-store.herokuapp.com/products

## Casos de uso

### Adicionar um produto novo ao catálogo
```
POST /products
```

Headers
```json
{
	"Authorization": "token"
}
```

Body
```json
{
	"title": "Lorem ipsum",
	"description": "Lorem ipsum dolor sit amet",
	"price": 399.99
}
```

Retorno
```
- 201 em caso de sucesso
- 400 caso haja um atributo não suportado
- 422 caso haja um atributo inválido
```

### Listar produtos disponíveis
```
GET /products
```

Retorno
```json
{
  "data": [
    {
			"title": "Lorem ipsum",
			"description": "Lorem ipsum dolor sit amet",
			"price": 399.99
		}
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```
```
- 200 em caso de sucesso
- 404 caso não existe um produto com o id informado
```

### Buscar produtos
```
GET /products?title=Lorem
```

Retorno
```json
{
  "data": [
    {
			"title": "Lorem ipsum",
			"description": "Lorem ipsum dolor sit amet",
			"price": 399.99
		}
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 2
  }
}
```
```
- 200 em caso de sucesso
- 400 caso haja um atributo não suportado
- 404 caso não existe um produto com o id informado
- 422 caso haja um atributo inválido
```

### Consultar um produto
```
GET /products/:id
```

Retorno
```json
{
	"title": "Lorem ipsum",
	"description": "Lorem ipsum dolor sit amet",
	"price": 399.99
}
```
```
- 200 em caso de sucesso
- 400 caso o id informado não esteja no padrão do Mongo
- 404 caso não existe um produto com o id informado
```

### Editar um produto existente no catálogo
```
PUT /products/:id
```

Headers
```json
{
	"Authorization": "token"
}
```

Body
```json
{
	"title": "Lorem ipsum",
	"description": "Lorem ipsum dolor sit amet",
	"price": 399.99
}
```

Retorno
```
- 204 em caso de sucesso
- 400 caso haja um atributo não suportado
- 404 caso não existe um produto com o id informado
- 422 caso haja um atributo inválido
```

### Remover um produto do catálogo
```
DELETE /products/:id
```

Headers
```json
{
	"Authorization": "token"
}
```

Retorno
```
- 204 em caso de sucesso
- 404 caso não existe um produto com o id informado
```
