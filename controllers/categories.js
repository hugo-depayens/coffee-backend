import * as categoriesDbController from '../db/categories.js';

export async function createCategory(req, res) {
    try {
        const { name, description } = req.body;
        const result = await categoriesDbController.createCategory(name, description);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при создании категории", error: error.message });
    }
}

export async function getAllCategories(req, res) {
    try {
        const result = await categoriesDbController.getAllCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении категорий", error: error.message });
    }
}

export async function getCategoryById(req, res) {
    try {
        const { id } = req.params;
        const result = await categoriesDbController.getCategoryById(id);

        if (result.length === 0) {
            return res.status(404).json({ message: "Категория не найдена" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении категории", error: error.message });
    }
}

export async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const result = await categoriesDbController.updateCategory(id, name, description);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Категория не найдена" });
        }

        res.status(200).json({ message: "Категория обновлена" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при обновлении категории", error: error.message });
    }
}

export async function partialUpdateCategory(req, res) {
    try {
        const { id } = req.params;
        console.log(id)
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({ message: "Не указаны данные для обновления" });
        }

        const updates = {};
        if (name) updates.name = name;
        if (description) updates.description = description;

        const result = await categoriesDbController.partialUpdateCategory(id, updates);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Категория не найдена" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при частичном обновлении категории", error: error.message });
    }
}


export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const result = await categoriesDbController.deleteCategory(id);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Категория не найдена" });
        }

        res.status(200).json({ message: "Категория удалена" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении категории", error: error.message });
    }
}
