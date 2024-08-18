// routes/testRoutes.js
import express from 'express';
import { verifyToken } from '../middleware/Auth.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
});

export default router;
