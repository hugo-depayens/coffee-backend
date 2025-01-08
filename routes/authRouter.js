import express from "express";
import bcrypt from "bcryptjs";

import {createUser, getUser} from "../db/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await createUser(req.body.username, hashedPassword);
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})