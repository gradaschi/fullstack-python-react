# Guilherme Gradaschi - 26/06/2023

Esta prova tem como objetivo avaliar suas habilidades em desenvolvimento
de aplicações web e back-end. Você será solicitado a desenvolver uma
aplicação que inclui uma API Python e uma interface web. A aplicação
permitirá que os usuários iniciem uma tarefa no servidor back-end enviando
parâmetros através da interface web. Além disso, a aplicação deve ser capaz
de enviar logs em tempo real do servidor para a interface web usando
WebSockets.

## Requisitos do Sistema

- Python 3.x
- Node.js
- npm

## Configuração do Ambiente

1. Clone o repositório:

```shell
git clone https://github.com/gradaschi/fullstack-python-react.git
```

## Crie e ative o ambiente virtual

```shell
python3 -m venv venv
source venv/bin/activate
```

## Instale as dependências do backend

```shell
pip install -r requirements.txt
```

## Instale as dependências do frontend

```shell
cd client
npm install
```

# Rodando a aplicação

## Inicie o servidor backend utilizando o venv

```shell
python server/app.py
```

## Inicie o servidor frontend

```shell
cd client
npm start
```

## Bibliotecas Utilizadas

## Backend

- Flask;
- Flask-Socket.io;
- Flask-CORS;

## Frontend

- React/Typescript
- Material-UI
- Axios
- Socket.io
