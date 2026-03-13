import { Router } from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller';

const router = Router();

router.post('/', createOrder); // POST /api/orders
router.get('/:userId', getUserOrders); // GET /api/orders/:userId

export default router;