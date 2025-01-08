import jwt from 'jsonwebtoken'




export function authenticateToken(req, res, next)  {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'No token provided.' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' })
      }

      req.user = user
      next()
    })
  }

export function  generateToken  (user)  {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
}


