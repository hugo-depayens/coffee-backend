import { pool } from "./db.js";

export const createProduct = async (name, price, category_id, image_url) => {
    try {
        const result = await pool.query(
            "INSERT INTO products (name, price, category_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *;",
            [name, price, category_id, image_url]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const result = await pool.query("SELECT * FROM products;");
        return result.rows;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1;", [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching product by id:", error);
        throw error;
    }
};

export const updateProduct = async (id, name, price, category_id, image_url) => {
    try {
        const query = `
            UPDATE products 
            SET name = $1, price = $2, category_id = $3, image_url = $4 
            WHERE id = $5 
            RETURNING *;
        `;
        const values = [name, price, category_id, image_url, id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            throw new Error(`Product with id ${id} not found`);
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};



export const partialUpdateProduct = async (id, { name, price, category_id, image_url }) => {
    try {
        const product = await getProductById(id);

        if (!product) {
            return { success: false, error: "Product not found." };
        }

        const updatedFields = [];
        const values = [];

        if (name) {
            updatedFields.push(`name = $${updatedFields.length + 1}`);
            values.push(name);
        }

        if (price) {
            updatedFields.push(`price = $${updatedFields.length + 1}`);
            values.push(price);
        }

        if (category_id) {
            updatedFields.push(`category_id = $${updatedFields.length + 1}`);
            values.push(category_id);
        }

        if (image_url) {
            updatedFields.push(`image_url = $${updatedFields.length + 1}`);
            values.push(image_url);
        }

        if (updatedFields.length === 0) {
            return { success: false, error: "No fields to update." };
        }

        const query = `UPDATE products SET ${updatedFields.join(", ")} WHERE id = $${updatedFields.length + 1} RETURNING *`;
        values.push(id);

        const result = await pool.query(query, values);

        return { success: true, data: result.rows[0] };

    } catch (err) {
        console.error("Error updating product:", err);
        return { success: false, error: err.message };
    }
};


export const deleteDBProduct = async (id) => {
    try {
        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *;", [id]);
        if (result.rows.length === 0) {
            throw new Error(`Product with id ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};


