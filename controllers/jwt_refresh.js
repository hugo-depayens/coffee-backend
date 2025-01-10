import jwt from 'jsonwebtoken';
import { generateToken } from '../middlewares/jwt.js';

export async function refreshAccessToken(req, res) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "Refresh токен отсутствует" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const newAccessToken = generateToken(payload);

        res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json("Token successfully refreshed!");
    } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
        res.status(403).json({ error: "Неверный или истекший refresh токен" });
    }
}
