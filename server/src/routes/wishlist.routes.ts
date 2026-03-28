import { Router } from 'express';
import { toggleWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/toggle', authMiddleware, toggleWishlist);

router.get('/', authMiddleware, getWishlist);

router.delete('/:productId', authMiddleware, removeFromWishlist);

export default router;