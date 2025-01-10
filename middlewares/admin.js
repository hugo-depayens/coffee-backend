import jwt from 'jsonwebtoken'


export function adminAuth(req, res, next)  {
    const token = req.cookies.token
    const payload = jwt.decode(token)
    const id = payload.id;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' })
        }

        console.log(payload)
        if(payload.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can access this route.' })
        }

        req.user = user
        next()
    })
}



export function generateToken  ({id ,username, email, role})  {
    return jwt.sign({id: id, username: username, email: email, role: role }, process.env.JWT_SECRET, { expiresIn: '24h' })
}


