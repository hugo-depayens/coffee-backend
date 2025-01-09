import { pool } from "./db.js";

export const createUser = async (username, password, email) => {
    try {
        const result = await pool.query(
            `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *`,
            [username, password, email]
        );
        return { success: true, data: result.rows[0] };
    } catch (err) {
        console.error("Error creating user:", err);
        return { success: false, error: err.message };
    }
};

export const getUser = async (username) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        return { success: true, data: result.rows[0] || null };
    } catch (err) {
        console.error("Error fetching user by username:", err);
        return { success: false, error: err.message };
    }
};

export const getUserByEmail = async (email) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return { success: true, data: result.rows[0] || null };
    } catch (err) {
        console.error("Error fetching user by email:", err);
        return { success: false, error: err.message };
    }
};

export const getUserById = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return { success: true, data: result.rows[0] || null };
    } catch (err) {
        console.error("Error fetching user by ID:", err);
        return { success: false, error: err.message };
    }
};

export const updateUser = async (id, username, newPassword) => {
    try {
        const result = await pool.query(
            `UPDATE users SET username=$1, password=$2 WHERE id=$3 RETURNING *`,
            [username, newPassword, id]
        );
        return { success: true, data: result.rows[0] || null };
    } catch (err) {
        console.error("Error updating user:", err);
        return { success: false, error: err.message };
    }
};

export const getAllUsers = async () => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        return { success: true, data: result.rows };
    } catch (err) {
        console.error("Error fetching all users:", err);
        return { success: false, error: err.message };
    }
};

export const deleteUser = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
        return { success: true, data: result.rows[0] || null };
    } catch (err) {
        console.error("Error deleting user:", err);
        return { success: false, error: err.message };
    }
};
