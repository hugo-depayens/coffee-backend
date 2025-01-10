# Coffee Shop Database

## Описание проекта

Данная база данных предназначена для управления данными кофеен, включая информацию о продуктах, клиентах, заказах и сотрудниках. Даталогическая схема представлена выше.

## Содержание
- [Описание проекта](#описание-проекта)
- [Технологии](#технологии)
- [Запуск приложения](#запуск-приложения)

## Технологии

- Docker
- PostgreSQL
- Node.js (если есть API)
- Express.js (опционально)

## Запуск приложения

Для запуска приложения с использованием Docker выполните следующие шаги:

### 1. Убедитесь, что установлены Docker и Docker Compose

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Клонируйте репозиторий

```bash
git clone (https://github.com/hugo-depayens/coffee-backend)
```

### 3. Создайте файл `.env`

Создайте файл `.env` в корневой директории проекта и добавьте переменные окружения. Пример:

```env
JWT_SECRET=coffee
NODE_ENV=development
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=coffee_shop
```

### 4. Соберите и запустите контейнеры

```bash
docker compose -f docker-compose.yml up --build
```

### 5. Проверьте, что приложение работает

По умолчанию база данных будет доступна на порту, указанном в `POSTGRES_PORT`. Чтобы подключиться к базе данных, можно использовать любой клиент PostgreSQL, например [DBeaver](https://dbeaver.io/) или `psql`.

### 6. Остановка контейнеров

Для остановки приложения выполните:

```bash
docker compose -f docker-compose.yml down
```

Для полного удаления (Включая базу данных):

```bash
docker compose -f docker-compose.yml down --volumes
```


## Контакты

Если у вас есть вопросы, пишите на email: vasv@gmail.com

Даталогическая модель базы данных:
![coffee_shop](https://github.com/user-attachments/assets/de091c15-bbe8-46c4-982b-c0bc0abcfe6e)
