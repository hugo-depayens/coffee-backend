import { getUserById } from "../db/users.js";

export function getUser(req, res) {
    const id = req.body.id;
    if (id) {
        res.json(getUserById(id))
    }else{
        res.status(404).json({ message: 'User not found.' })
    }
}