import { pool } from './db.js';

export const createOrder = async (user_id, status = 'pending') => {
  const cartQuery = `
    SELECT c.product_id, c.quantity, p.price
    FROM cart c
           JOIN products p ON c.product_id = p.id
    WHERE c.user_id = $1;
  `;
  const cartResult = await pool.query(cartQuery, [user_id]);

  if (cartResult.rows.length === 0) {
    throw new Error('Корзина пуста');
  }

  const items = cartResult.rows.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
    total: item.quantity * item.price
  }));

  const total_price = items.reduce((total, item) => total + item.total, 0);

  const order_data = {
    items: items,
    total_price: total_price
  };

  const orderQuery = `
        INSERT INTO orders (user_id, total_price, status, order_data)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
  const orderValues = [user_id, total_price, status, JSON.stringify(order_data)];
  const orderResult = await pool.query(orderQuery, orderValues);
  const order_id = orderResult.rows[0].id;

  const clearCartQuery = `DELETE FROM cart WHERE user_id = $1;`;
  await pool.query(clearCartQuery, [user_id]);

  return orderResult.rows[0];
};

export const getAllOrders = async () => {
  const query = `SELECT * FROM orders ORDER BY created_at DESC;`;
  return await pool.query(query);
};

export const getOrderById = async (id) => {
  const query = `SELECT * FROM orders WHERE id = $1;`;
  return await pool.query(query, [id]);
};

export const updateOrder = async (id, { user_id, total_price, status }) => {
  const query = `
    UPDATE orders
    SET user_id = $2, total_price = $3, status = $4
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, user_id, total_price, status];
  return await pool.query(query, values);
};

export const partialUpdateOrder = async (id, { status, total_price }) => {
  const fields = [];
  const values = [];

  if (status) {
    fields.push(`status = $${fields.length + 1}`);
    values.push(status);
  }

  if (total_price) {
    fields.push(`total_price = $${fields.length + 1}`);
    values.push(total_price);
  }

  console.log(fields);
  if (fields.length === 0) {
    throw new Error("Нет данных для обновления");
  }

  const setClause = fields.join(", ");
  const query = `
        UPDATE orders
        SET ${setClause}
        WHERE id = $${fields.length + 1}
        RETURNING *;
    `;

  return await pool.query(query, [...values, id]);
};

export const deleteOrder = async (id) => {
  const query = `DELETE FROM orders WHERE id = $1 RETURNING *;`;
  return await pool.query(query, [id]);
};
