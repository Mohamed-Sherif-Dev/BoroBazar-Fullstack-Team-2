import { Router } from 'express';
import { toggleWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller';

const router = Router();

router.post('/toggle', toggleWishlist);

router.get('/:userId', getWishlist);

router.delete('/:userId/:productId', removeFromWishlist);

export default router;