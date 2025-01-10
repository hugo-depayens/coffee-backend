import * as ordersDbController from '../db/orders.js';

export async function createOrder(req, res) {
    try {
        const { user_id, status } = req.body;
        const result = await ordersDbController.createOrder(user_id, status);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при создании заказа", error: error.message });
    }
}

export async function getAllOrders(req, res) {
    try {
        const result = await ordersDbController.getAllOrders();
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении заказов", error: error.message });
    }
}

export async function getOrderById(req, res) {
    try {
        const { id } = req.params;
        const result = await ordersDbController.getOrderById(id);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Заказ не найден" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении заказа", error: error.message });
    }
}

export async function updateOrder(req, res) {
    try {
        const { id } = req.params;
        const { user_id, total_price, status } = req.body;

        const result = await ordersDbController.updateOrder(id, { user_id, total_price, status });

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Заказ не найден" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при обновлении заказа", error: error.message });
    }
}

export async function partialUpdateOrder(req, res) {
    try {
        const { id } = req.params;
        const { status, total_price } = req.body;

        console.log(total_price, status)
        if (!status && !total_price) {
            return res.status(400).json({ message: "Нет данных для обновления" });
        }

        if (status && typeof status !== 'string') {
            return res.status(400).json({ message: "Поле 'status' должно быть строкой" });
        }

        if (total_price && (typeof total_price !== 'number' || total_price <= 0)) {
            return res.status(400).json({ message: "Поле 'total_price' должно быть положительным числом" });
        }

        const result = await ordersDbController.partialUpdateOrder(id, { status, total_price });

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Заказ не найден" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error while partial updating order:", error);
        res.status(500).json({ message: "Ошибка при частичном обновлении заказа", error: error.message });
    }
}


export async function deleteOrder(req, res) {
    try {
        const { id } = req.params;

        const result = await ordersDbController.deleteOrder(id);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Заказ не найден" });
        }

        res.status(200).json({ message: "Заказ успешно удалён" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении заказа", error: error.message });
    }
}
