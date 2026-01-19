## README recomendado (pronto para usar)

Você pode substituir pelo texto abaixo 👇

````md
# PomoFoco

Aplicação web de produtividade baseada na técnica Pomodoro.

## Tecnologias
- Python (Flask)
- SQLAlchemy
- JavaScript
- CSS

## Funcionalidades
- Temporizador de foco e pausas
- Registro de tempo de foco
- Interface web simples

## Executar localmente

1. Crie e ative um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
````

2. Instale as dependências:

```bash
pip install -r requirements.txt
```

3. Execute a aplicação:

```bash
flask --app app run
```

A aplicação estará disponível em `http://127.0.0.1:5000`.

## Deploy

O projeto está hospedado no Railway:
[https://pomofoco-production.up.railway.app/](https://pomofoco-production.up.railway.app/)

> Observação: o banco de dados é compartilhado entre os usuários.
> Os dados são apenas demonstrativos.

## Observações técnicas

O projeto utiliza banco de dados para treinar conceitos de back-end.
Uma alternativa seria o uso de `localStorage` no front-end para armazenar os dados localmente.
 
