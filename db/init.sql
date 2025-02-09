
-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     username VARCHAR(255) NOT NULL UNIQUE,
                                     password VARCHAR(255) NOT NULL,
                                     email VARCHAR(255) NOT NULL UNIQUE,
                                     address VARCHAR(255) DEFAULT NULL,
                                     role VARCHAR(50) DEFAULT 'user',
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы категорий
CREATE TABLE IF NOT EXISTS categories (
                                          id SERIAL PRIMARY KEY,
                                          name VARCHAR(255) NOT NULL UNIQUE,
                                          description TEXT DEFAULT '',
                                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы товаров
CREATE TABLE IF NOT EXISTS products (
                                        id SERIAL PRIMARY KEY,
                                        name VARCHAR(255) NOT NULL,
                                        price NUMERIC(10, 2) NOT NULL,
                                        category_id INT REFERENCES categories(id) ON DELETE CASCADE,
                                        image_url TEXT NOT NULL,
                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы заказов
CREATE TABLE IF NOT EXISTS orders (
                                      id SERIAL PRIMARY KEY,
                                      user_id INT REFERENCES users(id) ON DELETE CASCADE,
                                      total_price NUMERIC(10, 2) NOT NULL,
                                      status VARCHAR(30) NOT NULL default 'pending',
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                      order_data JSONB NOT NULL
);

-- Создание таблицы корзины
CREATE TABLE IF NOT EXISTS cart (
                                    id SERIAL PRIMARY KEY,
                                    user_id INT REFERENCES users(id) ON DELETE CASCADE,
                                    product_id INT REFERENCES products(id) ON DELETE CASCADE,
                                    quantity INT DEFAULT 1,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);


