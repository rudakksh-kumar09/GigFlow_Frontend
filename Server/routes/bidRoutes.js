import express from 'express';
import { submitBid, getBidsForGig, hireFreelancer, getUserBids } from '../controllers/bidController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitBid);
router.get('/my-bids', protect, getUserBids);
router.get('/:gigId', protect, getBidsForGig);
router.patch('/:bidId/hire', protect, hireFreelancer);

export default router;
