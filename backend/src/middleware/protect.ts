import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: string
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Not authorized, no token' })
    return
  }

  const parts = authHeader.split(' ')
  const token = parts[1]

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as unknown as { userId: string }
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: 'Not authorized, token invalid' })
  }
}