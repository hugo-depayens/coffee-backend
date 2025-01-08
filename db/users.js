import {pool} from "./db.js";

export const createUser = (username, password) => {
    return pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [username, password])
}

export const getUser = (username) => {
    return pool.query(`SELECT * FROM users WHERE username = $1`, [username])
}

export const getUserById = (id) => {
    return pool.query(`SELECT * FROM users WHERE id = $1`, [id])
}

export const updateUser = (id, username, newPassword) => {
    return pool.query(`UPDATE users SET username=$1, password=$2 WHERE id=$3`, [username, newPassword, id])
}

export const getAllUsers = () => {
    return pool.query(`SELECT * FROM users`)
}

export const deleteUser = (id) => {
    return pool.query(`DELETE FROM users WHERE id = $1`, [id])
}