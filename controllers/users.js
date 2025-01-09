import {getAllUsers, getUserById, partialUpdateUser, updateUser, deleteUser} from "../db/users.js";
import bcrypt from "bcryptjs"

export function getUser(req, res) {
    const id = req.body.id;
    if (id) {
        res.json(getUserById(id))
    }else{
        res.status(404).json({ message: 'User not found.' })
    }
}

export async function getUsers(req, res) {
    const users = await getAllUsers()
    console.log(users)
    res.json(users)
}

export async function getUsersById(req, res) {
    const id = parseInt(req.params.id)
    const user = await getUserById(id)
    if (user.data === null) {
        return res.status(404).json({ message: 'User not found.' })
    }

    if(!user.status){
        return res.status(403).json({ message: 'Internal error.' })
    }
    res.json(user)
}

export async function updateUserById(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    const { username, email, password, address, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await getUserById(id);

        console.log(user)
        if (user.data === null) {
            return res.status(404).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await updateUser(id, {
            username,
            email,
            password: hashedPassword,
            address,
            role,
        });

        if (!updatedUser.success) {
            return res.status(500).json({ message: updatedUser.error });
        }

        res.json({ message: "User updated successfully", user: updatedUser.data });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}

export async function partialUpdateUserById(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    const { username, email, password, address, role } = req.body;

    try {
        const user = await getUserById(id);

        if (user.data === null) {
            return res.status(404).json({ message: "User not found." });
        }

        const updatedFields = {};

        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (password) updatedFields.password = await bcrypt.hash(password, 10);
        if (address) updatedFields.address = address;
        if (role) updatedFields.role = role;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "No valid fields to update." });
        }

        const updatedUser = await partialUpdateUser(id, updatedFields);

        if (!updatedUser.success) {
            return res.status(500).json({ message: updatedUser.error });
        }

        res.json({ message: "User updated successfully", user: updatedUser.data });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}

export async function deleteUserById(req, res){
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    try {
        const user = await getUserById(id);

        if (user.data === null) {
            return res.status(404).json({ message: "User not found." });
        }

        const deletedUser = await deleteUser(id);

        if (!deletedUser.success) {
            return res.status(500).json({ message: deletedUser.error });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}
