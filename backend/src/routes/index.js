import express from 'express';
import salesRoutes from './salesRoutes.js';

const router = express.Router();

router.use('/api', salesRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default router;
