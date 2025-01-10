import * as productDbController from "../db/products.js";


export async function createProduct(req, res ) {
    const { name, price, category_id } = req.body;

    const image_url = req.file ? req.file.path : null;

    const result = await productDbController.createProduct(name, price, category_id, image_url)
    if(result){
        res.status(201).json('Продукт создан!');
    }else{
        res.status(400).json('Ошибка при создании продукта!');
    }
}

export async function getAllProducts(req, res) {
    try {
        const result = await productDbController.getAllProducts()
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка при получении списка продуктов" });
    }
}

export async function getProductById(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Неверный ID продукта" });
    }

    try {
        const result = await productDbController.getProductById(id);
        if (!result[0]) {
            return res.status(404).json({ error: "Продукт не найден" });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка при получении продукта" });
    }
}

export async function updateProduct(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Неверный ID продукта" });
    }

    const { name, price, category_id } = req.body;

    if (!name || !price || !category_id) {
        return res.status(400).json({ error: "Все поля (name, price, category_id) обязательны" });
    }

    const image_url = req.file ? req.file.path : null;

    try {
        const result = await productDbController.updateProduct(id, name, price, category_id, image_url);

        if (!result) {
            return res.status(404).json({ error: "Продукт не найден" });
        }

        res.json(result);
    } catch (error) {
        console.error("Ошибка при полном обновлении продукта:", error);
        res.status(500).json({ error: "Ошибка при обновлении продукта" });
    }
}


export async function partitionUpdate(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Неверный ID продукта" });
    }

    const { name, price, category_id, image_url } = req.body;

    try {
        const result = await productDbController.partialUpdateProduct(id, { name, price, category_id, image_url });
        if (!result.success) {
            return res.status(404).json({ error: result.error });
        }
        res.json(result.data);
    } catch (error) {
        console.error("Error in partitionUpdate:", error);
        res.status(500).json({ error: "Ошибка при изменении частичных полей продукта" });
    }
}


export async function deleteProduct(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID." });
    }

    try {
        const product = await productDbController.getProductById(id);
        console.log(product);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        const deletedProduct = await productDbController.deleteDBProduct(id);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}
