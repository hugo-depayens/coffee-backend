import { pool } from "./db.js";

export const createOrder = async (user_id, total_price) => {
  try {
    const result = await pool.query(
      "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
      [user_id, total_price]
    );
    return result;
  } catch (error) {
    throw new Error(`Ошибка при создании заказа: ${error.message}`);
  }
};

export const getOrder = async (order_id) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [
      order_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Ошибка при получении заказа: ${error.message}`);
  }
};

export const getUserOrders = async (user_id) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [
      user_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(
      `Ошибка при получении заказов пользователя: ${error.message}`
    );
  }
};

export const getOrderById = async (order_id) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [
      order_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Ошибка при получении заказа по ID: ${error.message}`);
  }
};

export const updateOrder = async (order_id, status) => {
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, order_id]
    );
    return result;
  } catch (error) {
    throw new Error(`Ошибка при обновлении заказа: ${error.message}`);
  }
};

export const deleteOrder = async (order_id) => {
  try {
    const result = await pool.query("DELETE FROM orders WHERE id = $1", [
      order_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Ошибка при удалении заказа: ${error.message}`);
  }
};
