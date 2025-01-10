import jwt from "jsonwebtoken";
import * as cartDbController from "../db/cart.js";

export async function addCart (req, res) {
    const token = req.cookies.token
    const payload = jwt.decode(token)
    const id = payload.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    cartDbController.addToCart(id, productId, quantity)
        .then((cart) => res.json(cart.rows))
        .catch((err) => res.status(500).json({ error: err.message }));
}

export async function getAllCart (req, res) {
    const token = req.cookies.token
    const payload = jwt.decode(token)
    const id = payload.id;

    cartDbController.getCart(id)
       .then((cart) => {
           res.json(cart)
       })
       .catch((err) => res.status(500).json({ error: err.message }));
}

export async function getCartById (req, res) {
    const token = req.cookies.token
    const payload = jwt.decode(token)
    const userId = payload.id;

    cartDbController.getCartById(userId)
       .then((cart) => res.json(cart.rows))
       .catch((err) => res.status(500).json({ error: err.message }));
}


export async function deleteItem(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Токен не найден. Авторизация обязательна." });
        }

        const payload = jwt.decode(token);
        if (!payload || !payload.id) {
            return res.status(401).json({ error: "Некорректный токен." });
        }

        const userId = payload.id;
        const itemId = req.query.itemId;
        console.log(itemId)

        await cartDbController.removeFromCart(userId, itemId);

        res.json({ message: "Элемент успешно удалён из корзины" });
    } catch (err) {
        console.error("Ошибка при удалении элемента из корзины:", err);
        res.status(500).json({ error: "Ошибка сервера при удалении элемента из корзины" });
    }
}

export async function clearCart (req, res) {
    const token = req.cookies.token
    const payload = jwt.decode(token)
    const id = payload.id;

    cartDbController.clear(id)
       .then(() => res.json({ message: "Cart deleted successfully" }))
       .catch((err) => res.status(500).json({ error: err.message }));
}