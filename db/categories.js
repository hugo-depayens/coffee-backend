import { pool } from "./db.js";

export const createCategory = async (name, description) => {
    try {
        const result = await pool.query(
            "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const result = await pool.query("SELECT * FROM categories");
        return result.rows;
    } catch (error) {
        console.error("Error fetching all categories:", error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const result = await pool.query(
            "SELECT * FROM categories WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            throw new Error(`Category with id ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    }
};

export const updateCategory = async (id, name, description) => {
    try {
        const result = await pool.query(
            "UPDATE categories SET name = $2, description = $3 WHERE id = $1 RETURNING *",
            [id, name, description]
        );
        if (result.rows.length === 0) {
            throw new Error(`Category with id ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const result = await pool.query(
            "DELETE FROM categories WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            throw new Error(`Category with id ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

export const partialUpdateCategory = async (id, { name, description }) => {
    try {
        const existingCategory = await getCategoryById(id);

        if (!existingCategory) {
            throw new Error(`Category with id ${id} not found`);
        }

        const updatedFields = [];
        const values = [];

        if (name) {
            updatedFields.push(`name = $${updatedFields.length + 1}`);
            values.push(name);
        }

        if (description) {
            updatedFields.push(`description = $${updatedFields.length + 1}`);
            values.push(description);
        }

        if (updatedFields.length === 0) {
            throw new Error("No fields to update");
        }

        const query = `UPDATE categories SET ${updatedFields.join(", ")} WHERE id = $${updatedFields.length + 1} RETURNING *`;
        values.push(id);

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error partially updating category:", error);
        throw error;
    }
};
