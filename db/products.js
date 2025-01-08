import {pool} from "./db.js";

export const createProduct = (name, price, category_id) => {
    return pool.query(
        "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *;",
        [name, price, category_id]
    );
}

export const getAllProducts = () => {
    return pool.query("SELECT * FROM products;");
}

export const getProductById = (id) => {
    return pool.query("SELECT * FROM products WHERE id = $1;", [id]);
}

export const updateProduct = (id, name, price, category_id) => {
    return pool.query(
        "UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *;",
        [name, price, category_id, id]
    );
}

export const deleteProduct = (id) => {
    return pool.query("DELETE FROM products WHERE id = $1;", [id]);
}