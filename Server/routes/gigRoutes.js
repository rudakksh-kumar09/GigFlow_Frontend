import express from 'express';
import { getGigs, getGig, createGig } from '../controllers/gigController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGigs);
router.get('/:id', getGig);
router.post('/', protect, createGig);

export default router;
