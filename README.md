# microservices
Projeto com base no fluxo de microservices com docker, com os containers api, jobs, database e cache com redis.


## Containers

O fluxo entre os containers é simples, na API é criado um novo job com bull conectado no redis CACHE, quando adiciona um novo objeto no redis o JOB inicia o novo job com a regra de negócio.

### API :

* express
* jwt
* criar um html em pdf
* conexão com container CACHE
* conexão com container DATABASE


### DATABASE:
* postgres


### CACHE:
   * redis

### JOBS:
* javascript
* bull
* conexão com container CACHE
* conexão com container DATABASE

### BRANCHS

### API
```
API-`NUMBER BRANCH`
```

### JOB
```
JOB-`NUMBER BRANCH`
```


### DOCKER
```
DOCKER-`NUMBER BRANCH`
```
