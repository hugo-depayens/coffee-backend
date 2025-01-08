import {pool} from "./db.js";

export const createOrder = (user_id, total_price) => {
    return pool.query(
        "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
        [user_id, total_price]
    );
}

export const getOrder = (order_id) => {
    return pool.query(
        "SELECT * FROM orders WHERE id = $1",
        [order_id]
    );
}

export const getUserOrders = (user_id) => {
    return pool.query(
        "SELECT * FROM orders WHERE user_id = $1",
        [user_id]
    );
}

export const getOrderById = (order_id) => {
    return pool.query(
        "SELECT * FROM orders WHERE id = $1",
        [order_id]
    );
}

export const updateOrder = (order_id, status) => {
    return pool.query(
        "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
        [status, order_id]
    );
}

export const deleteOrder = (order_id) => {
    return pool.query(
        "DELETE FROM orders WHERE id = $1",
        [order_id]
    );
}