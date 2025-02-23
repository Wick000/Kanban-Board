import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
 const {username, password} = req.body;

 try {
 
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  } 

  const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h', 
    });

    
    res.json({ token });
    return res.status(200).json()

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });

    return res.status(200).json()
  }
    

};

const router = Router();


router.post('/login', login);

export default router;
