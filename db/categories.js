import {pool} from "./db.js";

export const createCategory = (category) => {
    return pool.query(
        "INSERT INTO categories (name) VALUES ($1) RETURNING *",
        [category]
    );
}

export const getAllCategories = () => {
    return pool.query(
        "SELECT * FROM categories"
    );
}

export const getCategoryById = (id) => {
    return pool.query(
        "SELECT * FROM categories WHERE id = $1",
        [id]
    );
}

export const updateCategory = (id, category) => {
    return pool.query(
        "UPDATE categories SET name = $2 WHERE id = $1 RETURNING *",
        [id, category]
    );
}

export const deleteCategory = (id) => {
    return pool.query(
        "DELETE FROM categories WHERE id = $1",
        [id]
    );
}