import { Router } from 'express';
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.controller';

const router = Router();


router.post('/add', addToCart);
router.get('/:userId', getCart);
router.delete('/:userId/:productId', deleteFromCart);
export default router;