import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface JwtPayload {
  username: string;
}


export const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
 
  const token = req.header('Authorization')?.split(' ')[1]; // Assuming 'Bearer <token>'
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
 
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    
    req.user = decoded as JwtPayload;

    
    return next();
  });
};
