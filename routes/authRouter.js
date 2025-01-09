import express from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import { createUser, getUserByEmail } from "../db/users.js";
import { generateToken } from "../middlewares/jwt.js";

const router = express.Router();

const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    console.log("Validation errors:", errors.array());
    res.status(400).json({ errors: errors.array() });
};

router.post(
    "/registration",
    validate([
        body("username").isString().isLength({ min: 3 }).trim().escape(),
        body("password").isString().isLength({ min: 8 }),
        body("email").isEmail().normalizeEmail(),
    ]),
    async (req, res) => {
        const { username, password, email } = req.body;
        console.log("Register request received:", { username, email });

        try {
            const existingUser = await getUserByEmail(email);
            if (!existingUser.success) {
                console.error("Error fetching user by email:", existingUser.error);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (existingUser.data) {
                console.log("Email already in use:", email);
                return res.status(400).json({ error: "Email is already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Password hashed successfully for:", email);

            const createResult = await createUser(username, hashedPassword, email);
            if (!createResult.success) {
                console.error("Error creating user:", createResult.error);
                return res.status(500).json({ error: "Internal server error" });
            }

            console.log("User created successfully:", { username, email });
            res.status(201).json({ message: "Registered successfully!" });
        } catch (err) {
            console.error("Unexpected error during registration:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.post(
    "/authentication",
    validate([
        body("email").isEmail().normalizeEmail(),
        body("password").isString(),
    ]),
    async (req, res) => {
        const { email, password } = req.body;
        console.log("Login request received:", { email });

        try {
            const userResult = await getUserByEmail(email);
            if (!userResult.success) {
                console.error("Error fetching user by email:", userResult.error);
                return res.status(500).json({ error: "Internal server error" });
            }

            const user = userResult.data;
            if (!user) {
                console.log("User not found:", email);
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                console.log("Invalid password for:", email);
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = generateToken({ username: user.username, email: user.email });
            console.log("Token generated for:", email);

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });
            console.log("Cookie set for:", email);

            res.json({ message: "Logged in successfully" });
        } catch (err) {
            console.error("Unexpected error during login:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

export default router;
