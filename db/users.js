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

export const updateUser = async (id, {username, email, password, address, role }) => {
    if(!email || !password || !username) {
        return { success: false, error: "username, email and password are required"};
    }
    try {
        const result = await pool.query(
            `UPDATE users SET username=$1, email=$2, password=$3, address=$4, role=$5 WHERE id=$6 RETURNING *`,
            [username, email, password, address, role, id]
        );
        return { success: true, data: result.rows[0] };
    } catch (err) {
        console.error("Error updating user:", err);
        return { success: false, error: err.message };
    }
};

export const partialUpdateUser = async (id, { username, email, password, address, role }) => {
    try {
        const user = await getUserById(id);

        if (!user.data) {
            return { success: false, error: "User not found." };
        }

        const updatedFields = [];
        const values = [];

        if (username) {
            updatedFields.push(`username = $${updatedFields.length + 1}`);
            values.push(username);
        }

        if (email) {
            updatedFields.push(`email = $${updatedFields.length + 1}`);
            values.push(email);
        }

        if (password) {
            updatedFields.push(`password = $${updatedFields.length + 1}`);
            values.push(await bcrypt.hash(password, 10)); // Хэшируем пароль
        }

        if (address) {
            updatedFields.push(`address = $${updatedFields.length + 1}`);
            values.push(address);
        }

        if (role) {
            updatedFields.push(`role = $${updatedFields.length + 1}`);
            values.push(role);
        }

        if (updatedFields.length === 0) {
            return { success: false, error: "No fields to update." };
        }

        const query = `UPDATE users SET ${updatedFields.join(", ")} WHERE id = $${updatedFields.length + 1} RETURNING *`;
        values.push(id);

        const result = await pool.query(query, values);

        return { success: true, data: result.rows[0] };

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

