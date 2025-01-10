import { pool } from "./db.js";

export const addToCart = async (user_id, product_id, quantity) => {
    try {
        const result = await pool.query(
            `INSERT INTO cart (user_id, product_id, quantity) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (user_id, product_id) 
             DO UPDATE SET quantity = cart.quantity + $3
             RETURNING *`,
            [user_id, product_id, quantity]
        );
        return result;
    } catch (error) {
        throw new Error(`Ошибка при добавлении в корзину: ${error.message}`);
    }
};

export const getCart = async (user_id) => {
    try {
        const result = await pool.query(
            `SELECT c.*, p.name, p.price, p.image_url, (p.price * c.quantity) as total_price 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = $1`,
            [user_id]
        );
        return result;
    } catch (error) {
        throw new Error(`Ошибка при получении корзины: ${error.message}`);
    }
};

export const getCartById = async (user_id) => {
    try {
        const result = await pool.query(
            "SELECT * FROM cart WHERE user_id = $1",
            [user_id]
        );
        return result;
    } catch (error) {
        throw new Error(`Ошибка при получении корзины по ID: ${error.message}`);
    }
}

// export const updateCartItem = async (user_id, product_id, quantity) => {
//     try {
//         const result = await pool.query(
//             `UPDATE cart
//              SET quantity = $3, created_at = CURRENT_TIMESTAMP
//              WHERE user_id = $1 AND product_id = $2
//              RETURNING *`,
//             [user_id, product_id, quantity]
//         );
//         return result;
//     } catch (error) {
//         throw new Error(`Ошибка при обновлении количества в корзине: ${error.message}`);
//     }
// };

export const removeFromCart = async (user_id, product_id) => {
    try {
        const result = await pool.query(
            `WITH updated AS (
                UPDATE cart
                SET quantity = quantity - 1
                WHERE user_id = $1 AND product_id = $2 AND quantity > 1
                RETURNING *
            )
            DELETE FROM cart
            WHERE user_id = $1 AND product_id = $2 AND quantity = 1
            AND NOT EXISTS (SELECT 1 FROM updated)
            RETURNING *;`,
            [user_id, product_id]
        );

        return result.rows;
    } catch (error) {
        throw new Error(`Ошибка при изменении корзины: ${error.message}`);
    }
};


export const clear = async (user_id) => {
    try {
        const result = await pool.query(
            "DELETE FROM cart WHERE user_id = $1",
            [user_id]
        );
        return result;
    } catch (error) {
        throw new Error(`Ошибка при очистке корзины: ${error.message}`);
    }
};
